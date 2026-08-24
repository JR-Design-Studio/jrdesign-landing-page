"use server";

export type ContactState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

const MIN_FILL_MS = 2500;

/**
 * Anti-spam sin CAPTCHA visible: campo trampa + tiempo mínimo de llenado.
 * El envío usa Resend si hay RESEND_API_KEY; si no, queda registrado en el
 * servidor y el usuario recibe la ruta directa por WhatsApp.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const locale = String(formData.get("locale") ?? "es") === "en" ? "en" : "es";
  const s = (k: string) => String(formData.get(k) ?? "").trim();

  const name = s("name");
  const email = s("email");
  const company = s("company");
  const kind = s("kind");
  const message = s("message");
  const trap = s("website");
  const startedAt = Number(formData.get("startedAt") ?? 0);

  // Bot: llenó el campo oculto o contestó demasiado rápido.
  if (trap || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return {
      ok: true,
      message:
        locale === "en"
          ? "Thanks — we'll get back to you shortly."
          : "Gracias, te contestamos en breve.",
    };
  }

  const errors: Record<string, string> = {};
  if (name.length < 2)
    errors.name = locale === "en" ? "Tell us your name." : "Falta tu nombre.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email =
      locale === "en" ? "Check the email address." : "Revisa el correo.";
  if (message.length < 10)
    errors.message =
      locale === "en"
        ? "A couple of lines about the project help."
        : "Cuéntanos dos líneas del proyecto.";

  if (Object.keys(errors).length) {
    return {
      ok: false,
      message:
        locale === "en"
          ? "Some fields need a look."
          : "Revisa los campos marcados.",
      errors,
    };
  }

  const body = [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    company && `Empresa: ${company}`,
    kind && `Tipo de proyecto: ${kind}`,
    `Idioma: ${locale}`,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "hola@jrdesign.com.mx";

  if (key) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "JR Design <web@jrdesign.com.mx>",
          to: [to],
          reply_to: email,
          subject: `Nuevo contacto — ${name}${company ? ` (${company})` : ""}`,
          text: body,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (err) {
      console.error("[contacto] fallo al enviar", err);
      return {
        ok: false,
        message:
          locale === "en"
            ? "Something failed on our side. Message us on WhatsApp and we'll pick it up there."
            : "Algo falló de nuestro lado. Escríbenos por WhatsApp y lo retomamos ahí.",
      };
    }
  } else {
    // Sin credenciales configuradas: no perdemos el mensaje.
    console.info("[contacto] RESEND_API_KEY no configurada. Mensaje:\n" + body);
  }

  return {
    ok: true,
    message:
      locale === "en"
        ? "Got it. We reply within one business day."
        : "Recibido. Contestamos dentro de un día hábil.",
  };
}
