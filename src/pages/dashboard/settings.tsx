"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
import { toast } from "sonner";

import { FormField, PasswordInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { simulateDelay } from "@/lib/auth-simulate";
import { DEMO_EMPLOYEE } from "@/lib/dashboard-demo";
import { useAuthStore } from "@/store/useAuthStore";

const FIELD_CLASS = "h-12 rounded-lg";
const MAX_PHOTO_BYTES = 1024 * 1024;

export default function SettingsPage() {
  const { user } = useAuthStore();
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(
    user?.first_name || DEMO_EMPLOYEE.firstName,
  );
  const [lastName, setLastName] = useState(
    user?.last_name || DEMO_EMPLOYEE.lastName,
  );
  const [email, setEmail] = useState(user?.email || DEMO_EMPLOYEE.email);
  const [phone, setPhone] = useState<string>(DEMO_EMPLOYEE.phone);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl]);

  async function handleSaveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingProfile) return;
    setSavingProfile(true);
    await simulateDelay();
    toast.success("Profile saved", {
      description: "Your account details have been updated.",
    });
    setSavingProfile(false);
  }

  async function handleSavePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingPassword) return;
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setSavingPassword(true);
    await simulateDelay();
    toast.success("Password updated", {
      description: "Use your new password the next time you sign in.",
    });
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSavingPassword(false);
  }

  function handlePhotoChange(file: File | undefined) {
    if (!file) return;
    if (file.size > MAX_PHOTO_BYTES) {
      toast.error("Image must be under 1MB.");
      return;
    }
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-sans text-xl font-bold text-[#48484A] sm:text-2xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Manage system configurations and platform preferences.
        </p>
      </div>

      <section className="rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(16,70,64,0.06)] sm:p-6">
        <h2 className="text-base font-semibold text-[#1B1B1B]">
          Account Settings
        </h2>
        <form
          onSubmit={handleSaveProfile}
          className="mt-4 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px]"
        >
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="First name" htmlFor="first-name">
                <Input
                  id="first-name"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className={FIELD_CLASS}
                />
              </FormField>
              <FormField label="Last name" htmlFor="last-name">
                <Input
                  id="last-name"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className={FIELD_CLASS}
                />
              </FormField>
              <FormField label="Email Address" htmlFor="settings-email">
                <Input
                  id="settings-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={FIELD_CLASS}
                />
              </FormField>
              <FormField label="Phone number" htmlFor="settings-phone">
                <Input
                  id="settings-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className={FIELD_CLASS}
                />
              </FormField>
            </div>
            <Button
              type="submit"
              size="lg"
              className="mt-6 h-11"
              disabled={savingProfile}
            >
              {savingProfile ? "Saving..." : "Save"}
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative flex aspect-square w-full max-w-70 items-center justify-center overflow-hidden rounded-xl bg-[#EEF1F2]">
              {photoUrl ? (
                <OptimizedImage
                  src={photoUrl}
                  alt="Profile"
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              ) : (
                <span className="flex size-24 items-center justify-center rounded-full bg-[#008B8B] text-3xl font-semibold text-white">
                  {initials || "PC"}
                </span>
              )}
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="absolute bottom-4 left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-2 rounded-md bg-[#1B1B1B] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1B1B1B]/90"
              >
                <ArrowUp className="size-3.5" />
                Upload Photo
              </button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => handlePhotoChange(event.target.files?.[0])}
              />
            </div>
            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
              Image size should be under 1MB and image ratio needs to be 1:1
            </p>
          </div>
        </form>
      </section>

      <section className="max-w-xl rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(16,70,64,0.06)] sm:p-6">
        <h2 className="text-base font-semibold text-[#1B1B1B]">
          Change password
        </h2>
        <form onSubmit={handleSavePassword} className="mt-4 space-y-4">
          <FormField label="Old Password" htmlFor="old-password">
            <PasswordInput
              id="old-password"
              autoComplete="current-password"
              placeholder="Enter your old password"
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
              className={FIELD_CLASS}
            />
          </FormField>
          <FormField label="New Password" htmlFor="new-password">
            <PasswordInput
              id="new-password"
              autoComplete="new-password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className={FIELD_CLASS}
            />
          </FormField>
          <FormField label="Confirm password" htmlFor="confirm-password">
            <PasswordInput
              id="confirm-password"
              autoComplete="new-password"
              placeholder="Enter your new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={FIELD_CLASS}
            />
          </FormField>
          <Button
            type="submit"
            size="lg"
            className="h-11"
            disabled={savingPassword}
          >
            {savingPassword ? "Saving..." : "Save Changes"}
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </section>
    </div>
  );
}
