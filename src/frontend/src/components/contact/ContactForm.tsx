import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactMessage } from "@/hooks/use-products";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_FORM: FormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length === 0) {
    errors.name = "Nama wajib diisi.";
  }
  if (values.email.trim().length === 0) {
    errors.email = "Email wajib diisi.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Format email tidak valid.";
  }
  if (values.message.trim().length === 0) {
    errors.message = "Pesan wajib diisi.";
  }
  return errors;
}

const FIELD_CLASS =
  "rounded-none border-input bg-card h-11 font-body text-sm focus-visible:ring-ring";

/** Contact enquiry form backed by the canister's submitContactMessage method. */
export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitContactMessage();

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };

    setSubmitted(false);
    mutation.mutate(payload, {
      onSuccess: () => {
        setValues(EMPTY_FORM);
        setErrors({});
        setSubmitted(true);
      },
    });
  };

  return (
    <Card
      data-ocid="contact.form.card"
      className="border-border rounded-none shadow-none"
    >
      <CardContent className="p-6 sm:p-8">
        <h2 className="text-xl">Kirim Pesan</h2>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          Sampaikan pertanyaan mengenai koleksi, pesanan khusus, atau kunjungan
          workshop. Tim KAREEMA akan menghubungi Anda kembali.
        </p>

        <form
          noValidate
          onSubmit={handleSubmit}
          data-ocid="contact.form"
          className="mt-8 space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="contact-name"
                className="text-xs tracking-[0.14em]"
              >
                Nama <span className="text-accent">*</span>
              </Label>
              <Input
                id="contact-name"
                name="name"
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
                placeholder="Nama lengkap Anda"
                data-ocid="contact.name_input"
                className={cn(FIELD_CLASS, errors.name && "border-destructive")}
              />
              {errors.name ? (
                <p
                  id="contact-name-error"
                  data-ocid="contact.name_error"
                  className="text-destructive flex items-center gap-1.5 text-xs"
                >
                  <AlertCircle
                    className="size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="contact-email"
                className="text-xs tracking-[0.14em]"
              >
                Email <span className="text-accent">*</span>
              </Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
                placeholder="nama@email.com"
                data-ocid="contact.email_input"
                className={cn(
                  FIELD_CLASS,
                  errors.email && "border-destructive",
                )}
              />
              {errors.email ? (
                <p
                  id="contact-email-error"
                  data-ocid="contact.email_error"
                  className="text-destructive flex items-center gap-1.5 text-xs"
                >
                  <AlertCircle
                    className="size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="contact-phone"
                className="text-xs tracking-[0.14em]"
              >
                Nomor Telepon{" "}
                <span className="text-muted-foreground font-normal">
                  (opsional)
                </span>
              </Label>
              <Input
                id="contact-phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={(event) => update("phone", event.target.value)}
                placeholder="+62 812-3456-7890"
                data-ocid="contact.phone_input"
                className={FIELD_CLASS}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="contact-subject"
                className="text-xs tracking-[0.14em]"
              >
                Subjek
              </Label>
              <Input
                id="contact-subject"
                name="subject"
                value={values.subject}
                onChange={(event) => update("subject", event.target.value)}
                placeholder="Contoh: Pertanyaan koleksi tenun"
                data-ocid="contact.subject_input"
                className={FIELD_CLASS}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="contact-message"
              className="text-xs tracking-[0.14em]"
            >
              Pesan <span className="text-accent">*</span>
            </Label>
            <Textarea
              id="contact-message"
              name="message"
              rows={6}
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
              placeholder="Tuliskan pesan atau pertanyaan Anda di sini."
              data-ocid="contact.message_textarea"
              className={cn(
                "rounded-none border-input bg-card min-h-32 font-body text-sm focus-visible:ring-ring",
                errors.message && "border-destructive",
              )}
            />
            {errors.message ? (
              <p
                id="contact-message-error"
                data-ocid="contact.message_error"
                className="text-destructive flex items-center gap-1.5 text-xs"
              >
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                {errors.message}
              </p>
            ) : null}
          </div>

          {submitted ? (
            <output
              data-ocid="contact.success_state"
              className="border-success/40 bg-success/10 text-foreground flex items-start gap-3 border p-4 text-sm"
            >
              <CheckCircle2
                className="text-success mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              <span>
                Terima kasih, pesan Anda sudah kami terima. Tim KAREEMA akan
                menghubungi Anda kembali melalui email atau WhatsApp.
              </span>
            </output>
          ) : null}

          {mutation.isError ? (
            <div
              role="alert"
              data-ocid="contact.error_state"
              className="border-destructive/40 bg-destructive/10 text-foreground flex items-start gap-3 border p-4 text-sm"
            >
              <AlertCircle
                className="text-destructive mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              <span>
                Maaf, pesan Anda belum berhasil terkirim. Silakan coba lagi atau
                hubungi kami langsung melalui WhatsApp.
              </span>
            </div>
          ) : null}

          <Button
            type="submit"
            size="lg"
            disabled={mutation.isPending}
            data-ocid="contact.submit_button"
            className="h-12 w-full rounded-none font-display text-xs tracking-[0.2em] uppercase sm:w-auto sm:px-10"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Mengirim…
              </>
            ) : (
              <>
                <Send className="size-4" aria-hidden="true" />
                Kirim Pesan
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
