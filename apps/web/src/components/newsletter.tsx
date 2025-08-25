"use client";

import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";

type NewsletterFormValues = {
  email: string;
  privacyPolicy: boolean;
};

export function Newsletter() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    control,
    clearErrors,
    setValue,
  } = useForm<NewsletterFormValues>({
    defaultValues: {
      email: "",
      privacyPolicy: false,
    },
  });

  const [showThankYou, setShowThankYou] = useState(false);

  const onSubmit = async (data: NewsletterFormValues) => {
    console.log(data);
    setValue("email", "");
    setValue("privacyPolicy", false);
    setShowThankYou(true);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showThankYou) {
      timeout = setTimeout(() => {
        setShowThankYou(false);
      }, 3000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [showThankYou]);

  return (
    <form
      className="flex flex-col gap-3 w-full text-gun-powder"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Label htmlFor="newsletter-email">Newsletter</Label>
      <div className="flex gap-0.5">
        <Input
          id="newsletter-email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="bg-white rounded-none outline-none shadow-none focus-visible:ring-transparent focus-visible:border-none h-10 border border-dim-gray"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          })}
          aria-invalid={!!errors.email}
        />
        <Button
          type="submit"
          variant="outline"
          className="bg-white rounded-none"
          size="lg"
          disabled={isSubmitting}
        >
          Subscribe
        </Button>
      </div>
      {errors.email && (
        <span className="text-xs text-destructive">{errors.email.message}</span>
      )}
      <div className="flex items-center gap-2">
        <Controller
          name="privacyPolicy"
          control={control}
          rules={{ required: "You must agree to the Privacy Policy" }}
          render={({ field }) => (
            <Checkbox
              id="privacy-policy"
              className={cn(
                "rounded-full border-gun-powder cursor-pointer",
                errors.privacyPolicy && "border-destructive",
              )}
              checked={field.value}
              onCheckedChange={(value) => {
                field.onChange(value);
                if (value) {
                  clearErrors("privacyPolicy");
                }
              }}
            />
          )}
        />
        <Label
          htmlFor="privacy-policy"
          className={cn(
            "text-xs",
            errors.privacyPolicy && "text-destructive",
            !errors.privacyPolicy && "text-gun-powder",
          )}
        >
          I agree to our Privacy Policy
        </Label>
      </div>
      {isSubmitSuccessful && showThankYou && (
        <span className="text-xs text-green-600">
          Thank you for subscribing!
        </span>
      )}
    </form>
  );
}
