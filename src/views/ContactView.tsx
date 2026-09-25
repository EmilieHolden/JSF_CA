import { useState } from "react"
import type { SubmitEvent, ChangeEvent } from "react"
import Breadcrumbs from "../components/Breadcrumbs"

interface ContactFormData {
  fullName: string
  subject: string
  email: string
  message: string
}

interface FormErrors {
  fullName?: string
  subject?: string
  email?: string
  message?: string
}

function isValidEmail(email: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailPattern.test(email)
}

function ContactView() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function validateForm() {
    const newErrors: FormErrors = {}

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters."
    }

    if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters."
    }

    if (!isValidEmail(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address."
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters."
    }

    return newErrors
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateForm()

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSubmitted(true)

    setFormData({
      fullName: "",
      subject: "",
      email: "",
      message: "",
    })
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs currentPage="Contact" />

      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label htmlFor="fullName" className="mb-2 block font-medium">
              Full name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-md border border-border px-3 py-2.5 outline-none transition focus:border-primary"
            />

            {errors.fullName && (
              <p id="fullName-error" className="mt-1 text-sm text-red-600">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block font-medium">
              Subject
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className="w-full rounded-md border border-border px-3 py-2.5 outline-none transition focus:border-primary"
            />

            {errors.subject && (
              <p id="subject-error" className="mt-1 text-sm text-red-600">
                {errors.subject}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-medium">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-md border border-border px-3 py-2.5 outline-none transition focus:border-primary"
            />

            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block font-medium">
              Message
            </label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="w-full resize-y rounded-md border border-border px-3 py-2.5 outline-none transition focus:border-primary"
            />

            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-600">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-md bg-primary opacity-85 text-bg px-6 py-3 font-medium transition hover:opacity-100"
          >
            Send your message
          </button>
        </form>
        {isSubmitted && (
          <p className="mt-6">Your message has been sent successfully.</p>
        )}
      </div>
    </main>
  )
}

export default ContactView
