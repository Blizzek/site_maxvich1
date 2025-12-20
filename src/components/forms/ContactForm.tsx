"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

const formSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(6, "Введите телефон"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  title?: string;
  subtitle?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  title = "Оставьте заявку",
  subtitle = "Мы перезвоним в течение 15 минут",
}) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке заявки');
      }

      setSubmitted(true);
      reset();
      
      // Скрыть сообщение об успехе через 5 секунд
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-xl border border-gray-100 p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
        {submitted && (
          <div className="mt-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            Спасибо! Мы связались, заявка уже в работе.
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-800">Имя</label>
          <Input placeholder="Ваше имя" {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-800">Телефон</label>
          <Input
            placeholder="+7 (___) ___-__-__"
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-800">Комментарий</label>
          <Textarea
            rows={4}
            placeholder="Расскажите, что нужно сделать"
            {...register("message")}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Отправляем..." : "Отправить заявку"}
        </Button>
        <p className="text-xs text-gray-400 text-center">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </form>
    </div>
  );
};
