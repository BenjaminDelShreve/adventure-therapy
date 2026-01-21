"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ProgramCategory = "veterans" | "recovery" | "couples" | ""

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    // Section 1: Basic Info
    fullName: "",
    preferredName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    age: "",
    dateOfBirth: "",
    gender: "",
    // Section 2: Program Category
    programCategory: "" as ProgramCategory,
    partnerName: "",
    partnerEmail: "",
    branchOrRole: "",
    // Section 3: Connection
    whatDrewYou: "",
    hopingToGain: "",
    participatedBefore: "",
    participatedDescription: "",
    // Section 4: Readiness
    physicalActivity: "",
    emotionalReadiness: "",
    professionalSupports: "",
    // Section 5: Category-Specific
    // Veterans/First Responders
    serviceBackground: [] as string[],
    experiencingIsolation: "",
    // Recovery
    inRecovery: "",
    recoveryLength: "",
    recoverySupport: "",
    // Couples
    togetherLength: "",
    bothPartnersWilling: "",
    couplesCounseling: "",
    // Section 6: Logistics
    ableToCommit: "",
    financialAssistance: "",
    dietaryAccessibility: "",
    // Section 7: Values
    alignedWithValues: "",
    anythingElse: "",
    // Section 8: Consent
    notGuarantee: false,
    additionalScreening: false,
    informationAccurate: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [useDateOfBirth, setUseDateOfBirth] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.programCategory) {
      newErrors.programCategory = "Please select a program category"
    }
    if (formData.programCategory === "couples") {
      if (!formData.partnerName.trim()) newErrors.partnerName = "Partner name is required"
      if (!formData.partnerEmail.trim()) {
        newErrors.partnerEmail = "Partner email is required"
      } else if (!validateEmail(formData.partnerEmail)) {
        newErrors.partnerEmail = "Please enter a valid email address"
      }
    }
    if (!formData.whatDrewYou.trim()) newErrors.whatDrewYou = "This field is required"
    if (!formData.hopingToGain.trim()) newErrors.hopingToGain = "This field is required"
    if (!formData.physicalActivity) newErrors.physicalActivity = "This field is required"
    if (!formData.emotionalReadiness) newErrors.emotionalReadiness = "This field is required"
    if (!formData.ableToCommit) newErrors.ableToCommit = "This field is required"
    if (!formData.financialAssistance) newErrors.financialAssistance = "This field is required"
    if (!formData.alignedWithValues) newErrors.alignedWithValues = "This field is required"
    if (!formData.notGuarantee) newErrors.notGuarantee = "This consent is required"
    if (!formData.additionalScreening) newErrors.additionalScreening = "This consent is required"
    if (!formData.informationAccurate) newErrors.informationAccurate = "This consent is required"

    // Category-specific validation
    if (formData.programCategory === "veterans") {
      if (formData.serviceBackground.length === 0) {
        newErrors.serviceBackground = "Please select at least one service background"
      }
    }
    if (formData.programCategory === "recovery") {
      if (!formData.inRecovery) newErrors.inRecovery = "This field is required"
      if (!formData.recoveryLength) newErrors.recoveryLength = "This field is required"
    }
    if (formData.programCategory === "couples") {
      if (!formData.bothPartnersWilling) newErrors.bothPartnersWilling = "This field is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    // Submit to API
    setIsSubmitting(true)
    setSuccessMessage("")

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.ok) {
        setSuccessMessage(
          "Thank you! Your application has been submitted successfully. We will review your application and get back to you soon."
        )
        // Clear any previous errors
        setErrors({})
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" })
        // Reset form after successful submission
        setFormData({
          fullName: "",
          preferredName: "",
          email: "",
          phone: "",
          city: "",
          state: "",
          age: "",
          dateOfBirth: "",
          gender: "",
          programCategory: "" as ProgramCategory,
          partnerName: "",
          partnerEmail: "",
          branchOrRole: "",
          whatDrewYou: "",
          hopingToGain: "",
          participatedBefore: "",
          participatedDescription: "",
          physicalActivity: "",
          emotionalReadiness: "",
          professionalSupports: "",
          serviceBackground: [],
          experiencingIsolation: "",
          inRecovery: "",
          recoveryLength: "",
          recoverySupport: "",
          togetherLength: "",
          bothPartnersWilling: "",
          couplesCounseling: "",
          ableToCommit: "",
          financialAssistance: "",
          dietaryAccessibility: "",
          alignedWithValues: "",
          anythingElse: "",
          notGuarantee: false,
          additionalScreening: false,
          informationAccurate: false,
        })
        setUseDateOfBirth(false)
      } else {
        // Form does NOT clear on error - keep user's data
        const errorMessage = data.error || "Failed to submit application. Please try again."
        setErrors({ submit: errorMessage })
        // Scroll to top to show error message
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      // Form does NOT clear on error - keep user's data
      setErrors({
        submit: "An error occurred while submitting your application. Please check your connection and try again.",
      })
      // Scroll to top to show error message
      window.scrollTo({ top: 0, behavior: "smooth" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const toggleServiceBackground = (value: string) => {
    const current = formData.serviceBackground
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]
    updateField("serviceBackground", updated)
  }

  return (
    <section className="py-20 sm:py-24 lg:py-32">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-10">
              <Image
                src="/images/AT_Logo_Black.svg"
                alt="Adventure Therapy Logo"
                width={120}
                height={100}
                className="h-20 w-auto"
                priority
              />
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-at-dark-green sm:text-4xl lg:text-5xl text-center">
              Adventure Therapy Application
            </h1>

            {/* Success Message */}
            {successMessage && (
              <div className="mt-8 rounded-lg border border-green-500 bg-green-50 dark:bg-green-950/20 p-6">
                <p className="text-green-800 dark:text-green-200 font-medium">{successMessage}</p>
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className="mt-8 rounded-lg border border-destructive bg-destructive/10 p-6">
                <p className="text-destructive font-medium">{errors.submit}</p>
              </div>
            )}

            {/* Intro Framing */}
            <div className="mt-8 rounded-lg border border-border bg-card p-6">
              <p className="text-pretty text-base leading-relaxed text-foreground/80 mb-4">
                Adventure Therapy combines healing through adventure, connection, and wellness. This application is an
                initial step to see if a program may be a good fit for you.
              </p>
              <p className="text-pretty text-base leading-relaxed text-foreground/80 mb-4">
                <strong>What this is:</strong> An opportunity to share your story and interest in our programs.
              </p>
              <p className="text-pretty text-base leading-relaxed text-foreground/80 mb-4">
                <strong>What this is not:</strong> A guarantee of acceptance or participation.
              </p>
              <p className="text-pretty text-base leading-relaxed text-foreground/80">
                All information provided is confidential and treated with respect. This form typically takes 10–15
                minutes to complete.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-12 space-y-12">
              {/* SECTION 1: Basic Applicant Information */}
              <fieldset className="space-y-6">
                <legend className="text-xl sm:text-2xl font-bold text-at-dark-green mb-4">Section 1: Basic Applicant Information</legend>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="preferredName">Preferred Name (optional)</Label>
                    <Input
                      id="preferredName"
                      type="text"
                      value={formData.preferredName}
                      onChange={(e) => updateField("preferredName", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateField("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        type="text"
                        value={formData.state}
                        onChange={(e) => updateField("state", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <Label htmlFor="useDateOfBirth" className="cursor-pointer">
                        <Checkbox
                          id="useDateOfBirth"
                          checked={useDateOfBirth}
                          onCheckedChange={(checked) => setUseDateOfBirth(checked as boolean)}
                        />
                        <span className="ml-2">Use Date of Birth instead of Age</span>
                      </Label>
                    </div>
                    {useDateOfBirth ? (
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => updateField("dateOfBirth", e.target.value)}
                        />
                      </div>
                    ) : (
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          min="18"
                          value={formData.age}
                          onChange={(e) => updateField("age", e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender (optional)</Label>
                    <Select value={formData.gender} onValueChange={(value) => updateField("gender", value)}>
                      <SelectTrigger id="gender" className="w-full">
                        <SelectValue placeholder="Select or prefer not to say" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </fieldset>

              {/* SECTION 2: Program Category Selection */}
              <fieldset className="space-y-6">
                <legend className="text-xl sm:text-2xl font-bold text-at-dark-green mb-4">Section 2: Program Category Selection</legend>

                <div>
                  <Label>
                    Which Adventure Therapy program are you applying for? <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.programCategory}
                    onValueChange={(value) => updateField("programCategory", value as ProgramCategory)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="veterans" id="veterans" />
                      <Label htmlFor="veterans" className="font-normal cursor-pointer">
                        Veterans & First Responders
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="recovery" id="recovery" />
                      <Label htmlFor="recovery" className="font-normal cursor-pointer">
                        Individuals in Recovery from Substance Use Disorders
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="couples" id="couples" />
                      <Label htmlFor="couples" className="font-normal cursor-pointer">
                        Couples Struggling in Marriage
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.programCategory && (
                    <p className="mt-1 text-sm text-destructive">{errors.programCategory}</p>
                  )}
                </div>

                {/* Conditional: Couples */}
                {formData.programCategory === "couples" && (
                  <div className="mt-6 space-y-4 p-4 border border-border rounded-lg bg-card/50">
                    <div>
                      <Label htmlFor="partnerName">
                        Partner's Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="partnerName"
                        type="text"
                        value={formData.partnerName}
                        onChange={(e) => updateField("partnerName", e.target.value)}
                        className={errors.partnerName ? "border-destructive" : ""}
                      />
                      {errors.partnerName && <p className="mt-1 text-sm text-destructive">{errors.partnerName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="partnerEmail">
                        Partner's Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="partnerEmail"
                        type="email"
                        value={formData.partnerEmail}
                        onChange={(e) => updateField("partnerEmail", e.target.value)}
                        className={errors.partnerEmail ? "border-destructive" : ""}
                      />
                      {errors.partnerEmail && <p className="mt-1 text-sm text-destructive">{errors.partnerEmail}</p>}
                    </div>
                  </div>
                )}

                {/* Conditional: Veterans/First Responders */}
                {formData.programCategory === "veterans" && (
                  <div className="mt-6 p-4 border border-border rounded-lg bg-card/50">
                    <Label htmlFor="branchOrRole">Branch/Role (brief description)</Label>
                    <Input
                      id="branchOrRole"
                      type="text"
                      placeholder="e.g., Army Veteran, Firefighter, EMT"
                      value={formData.branchOrRole}
                      onChange={(e) => updateField("branchOrRole", e.target.value)}
                    />
                  </div>
                )}
              </fieldset>

              {/* SECTION 3: Connection to Program */}
              <fieldset className="space-y-6">
                <legend className="text-xl sm:text-2xl font-bold text-at-dark-green mb-4">Section 3: Connection to the Program</legend>

                <div>
                  <Label htmlFor="whatDrewYou">
                    In your own words, what drew you to Adventure Therapy? <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="whatDrewYou"
                    rows={4}
                    required
                    value={formData.whatDrewYou}
                    onChange={(e) => updateField("whatDrewYou", e.target.value)}
                    className={errors.whatDrewYou ? "border-destructive" : ""}
                  />
                  {errors.whatDrewYou && <p className="mt-1 text-sm text-destructive">{errors.whatDrewYou}</p>}
                </div>

                <div>
                  <Label htmlFor="hopingToGain">
                    What are you hoping to gain from participating in an Adventure Therapy experience?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="hopingToGain"
                    rows={4}
                    required
                    value={formData.hopingToGain}
                    onChange={(e) => updateField("hopingToGain", e.target.value)}
                    className={errors.hopingToGain ? "border-destructive" : ""}
                    placeholder="Growth, connection, healing, perspective, tools, etc."
                  />
                  {errors.hopingToGain && <p className="mt-1 text-sm text-destructive">{errors.hopingToGain}</p>}
                </div>

                <div>
                  <Label>Have you participated in any similar programs, retreats, or therapeutic experiences before?</Label>
                  <RadioGroup
                    value={formData.participatedBefore}
                    onValueChange={(value) => updateField("participatedBefore", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="participated-yes" />
                      <Label htmlFor="participated-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="participated-no" />
                      <Label htmlFor="participated-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.participatedBefore === "yes" && (
                    <div className="mt-4">
                      <Label htmlFor="participatedDescription">Brief description (optional)</Label>
                      <Textarea
                        id="participatedDescription"
                        rows={3}
                        value={formData.participatedDescription}
                        onChange={(e) => updateField("participatedDescription", e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </fieldset>

              {/* SECTION 4: Readiness & Safety Screening */}
              <fieldset className="space-y-6">
                <legend className="text-xl sm:text-2xl font-bold text-at-dark-green mb-4">
                  Section 4: High-Level Readiness & Safety Screening
                </legend>

                <div>
                  <Label>
                    Are you currently able to participate in moderate physical activity such as hiking, biking, or
                    water-based activities? <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.physicalActivity}
                    onValueChange={(value) => updateField("physicalActivity", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="physical-yes" />
                      <Label htmlFor="physical-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="with-limitations" id="physical-limitations" />
                      <Label htmlFor="physical-limitations" className="font-normal cursor-pointer">
                        With some limitations
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="physical-no" />
                      <Label htmlFor="physical-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.physicalActivity && (
                    <p className="mt-1 text-sm text-destructive">{errors.physicalActivity}</p>
                  )}
                </div>

                <div>
                  <Label>
                    Do you feel emotionally stable enough to participate in a group-based experience involving guided
                    discussions and reflection? <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.emotionalReadiness}
                    onValueChange={(value) => updateField("emotionalReadiness", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="emotional-yes" />
                      <Label htmlFor="emotional-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unsure" id="emotional-unsure" />
                      <Label htmlFor="emotional-unsure" className="font-normal cursor-pointer">
                        Unsure
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="emotional-no" />
                      <Label htmlFor="emotional-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.emotionalReadiness && (
                    <p className="mt-1 text-sm text-destructive">{errors.emotionalReadiness}</p>
                  )}
                </div>

                <div>
                  <Label>Are you currently working with any professional supports (therapist, counselor, sponsor, etc.)?</Label>
                  <RadioGroup
                    value={formData.professionalSupports}
                    onValueChange={(value) => updateField("professionalSupports", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="supports-yes" />
                      <Label htmlFor="supports-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="supports-no" />
                      <Label htmlFor="supports-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefer-not-to-say" id="supports-prefer-not" />
                      <Label htmlFor="supports-prefer-not" className="font-normal cursor-pointer">
                        Prefer not to say
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </fieldset>

              {/* SECTION 5: Category-Specific Questions */}
              {formData.programCategory && (
                <fieldset className="space-y-6">
                  <legend className="text-xl sm:text-2xl font-bold text-at-dark-green mb-4">
                    Section 5: Category-Specific Questions
                  </legend>

                  {/* Veterans & First Responders */}
                  {formData.programCategory === "veterans" && (
                    <div className="space-y-6">
                      <div>
                        <Label>
                          Service background (check all that apply): <span className="text-destructive">*</span>
                        </Label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="service-veteran"
                              checked={formData.serviceBackground.includes("veteran")}
                              onCheckedChange={() => toggleServiceBackground("veteran")}
                            />
                            <Label htmlFor="service-veteran" className="font-normal cursor-pointer">
                              Veteran
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="service-active"
                              checked={formData.serviceBackground.includes("active")}
                              onCheckedChange={() => toggleServiceBackground("active")}
                            />
                            <Label htmlFor="service-active" className="font-normal cursor-pointer">
                              Active Duty / Guard / Reserve
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="service-first-responder"
                              checked={formData.serviceBackground.includes("first-responder")}
                              onCheckedChange={() => toggleServiceBackground("first-responder")}
                            />
                            <Label htmlFor="service-first-responder" className="font-normal cursor-pointer">
                              First Responder (Fire, EMS, Law Enforcement, Dispatch, etc.)
                            </Label>
                          </div>
                        </div>
                        {errors.serviceBackground && (
                          <p className="mt-1 text-sm text-destructive">{errors.serviceBackground}</p>
                        )}
                      </div>

                      <div>
                        <Label>
                          Are you currently experiencing feelings of isolation, burnout, or difficulty transitioning to
                          civilian or balanced life?
                        </Label>
                        <RadioGroup
                          value={formData.experiencingIsolation}
                          onValueChange={(value) => updateField("experiencingIsolation", value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="isolation-yes" />
                            <Label htmlFor="isolation-yes" className="font-normal cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="isolation-no" />
                            <Label htmlFor="isolation-no" className="font-normal cursor-pointer">
                              No
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="prefer-not-to-say" id="isolation-prefer-not" />
                            <Label htmlFor="isolation-prefer-not" className="font-normal cursor-pointer">
                              Prefer not to say
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  )}

                  {/* Recovery */}
                  {formData.programCategory === "recovery" && (
                    <div className="space-y-6">
                      <div>
                        <Label>
                          Are you currently in recovery from a substance use disorder? <span className="text-destructive">*</span>
                        </Label>
                        <RadioGroup
                          value={formData.inRecovery}
                          onValueChange={(value) => updateField("inRecovery", value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="recovery-yes" />
                            <Label htmlFor="recovery-yes" className="font-normal cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="recovery-no" />
                            <Label htmlFor="recovery-no" className="font-normal cursor-pointer">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                        {errors.inRecovery && <p className="mt-1 text-sm text-destructive">{errors.inRecovery}</p>}
                      </div>

                      <div>
                        <Label>
                          How long have you been in recovery? <span className="text-destructive">*</span>
                        </Label>
                        <RadioGroup
                          value={formData.recoveryLength}
                          onValueChange={(value) => updateField("recoveryLength", value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="less-than-6" id="recovery-less-6" />
                            <Label htmlFor="recovery-less-6" className="font-normal cursor-pointer">
                              Less than 6 months
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="6-12" id="recovery-6-12" />
                            <Label htmlFor="recovery-6-12" className="font-normal cursor-pointer">
                              6–12 months
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1-plus" id="recovery-1-plus" />
                            <Label htmlFor="recovery-1-plus" className="font-normal cursor-pointer">
                              1+ years
                            </Label>
                          </div>
                        </RadioGroup>
                        {errors.recoveryLength && (
                          <p className="mt-1 text-sm text-destructive">{errors.recoveryLength}</p>
                        )}
                      </div>

                      <div>
                        <Label>
                          Do you currently have a recovery support system (sponsor, group, counselor, etc.)?
                        </Label>
                        <RadioGroup
                          value={formData.recoverySupport}
                          onValueChange={(value) => updateField("recoverySupport", value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="recovery-support-yes" />
                            <Label htmlFor="recovery-support-yes" className="font-normal cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="recovery-support-no" />
                            <Label htmlFor="recovery-support-no" className="font-normal cursor-pointer">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  )}

                  {/* Couples */}
                  {formData.programCategory === "couples" && (
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="togetherLength">How long have you been together?</Label>
                        <Input
                          id="togetherLength"
                          type="text"
                          placeholder="e.g., 5 years, 2 years married"
                          value={formData.togetherLength}
                          onChange={(e) => updateField("togetherLength", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label>
                          Are both partners willing to actively participate in the full adventure and group experience?{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <RadioGroup
                          value={formData.bothPartnersWilling}
                          onValueChange={(value) => updateField("bothPartnersWilling", value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="partners-willing-yes" />
                            <Label htmlFor="partners-willing-yes" className="font-normal cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="partners-willing-no" />
                            <Label htmlFor="partners-willing-no" className="font-normal cursor-pointer">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                        {errors.bothPartnersWilling && (
                          <p className="mt-1 text-sm text-destructive">{errors.bothPartnersWilling}</p>
                        )}
                      </div>

                      <div>
                        <Label>Are you currently in couples counseling or open to professional support?</Label>
                        <RadioGroup
                          value={formData.couplesCounseling}
                          onValueChange={(value) => updateField("couplesCounseling", value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="counseling-yes" />
                            <Label htmlFor="counseling-yes" className="font-normal cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="counseling-no" />
                            <Label htmlFor="counseling-no" className="font-normal cursor-pointer">
                              No
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="unsure" id="counseling-unsure" />
                            <Label htmlFor="counseling-unsure" className="font-normal cursor-pointer">
                              Unsure
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  )}
                </fieldset>
              )}

              {/* SECTION 6: Logistics & Commitment */}
              <fieldset className="space-y-6">
                <legend className="text-xl sm:text-2xl font-bold text-at-dark-green mb-4">Section 6: Logistics & Commitment</legend>

                <div>
                  <Label>
                    Are you able to commit to a 5–6 day, fully immersive experience (travel, lodging, activities)?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.ableToCommit}
                    onValueChange={(value) => updateField("ableToCommit", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="commit-yes" />
                      <Label htmlFor="commit-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="possibly" id="commit-possibly" />
                      <Label htmlFor="commit-possibly" className="font-normal cursor-pointer">
                        Possibly (with coordination)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="commit-no" />
                      <Label htmlFor="commit-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.ableToCommit && <p className="mt-1 text-sm text-destructive">{errors.ableToCommit}</p>}
                </div>

                <div>
                  <Label>
                    Do you anticipate needing financial assistance or a full scholarship to participate?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.financialAssistance}
                    onValueChange={(value) => updateField("financialAssistance", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="financial-yes" />
                      <Label htmlFor="financial-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="partial" id="financial-partial" />
                      <Label htmlFor="financial-partial" className="font-normal cursor-pointer">
                        Partial assistance
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="financial-no" />
                      <Label htmlFor="financial-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.financialAssistance && (
                    <p className="mt-1 text-sm text-destructive">{errors.financialAssistance}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dietaryAccessibility">
                    Do you have any dietary restrictions or accessibility needs we should be aware of if we move forward?
                    (Optional)
                  </Label>
                  <Textarea
                    id="dietaryAccessibility"
                    rows={3}
                    value={formData.dietaryAccessibility}
                    onChange={(e) => updateField("dietaryAccessibility", e.target.value)}
                  />
                </div>
              </fieldset>

              {/* SECTION 7: Values & Group Fit */}
              <fieldset className="space-y-6">
                <legend className="text-xl sm:text-2xl font-bold text-at-dark-green mb-4">Section 7: Values & Group Fit</legend>

                <div>
                  <Label>
                    Adventure Therapy experiences involve group connection, respect, accountability, and openness. Do you
                    feel aligned with these values? <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.alignedWithValues}
                    onValueChange={(value) => updateField("alignedWithValues", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="values-yes" />
                      <Label htmlFor="values-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unsure" id="values-unsure" />
                      <Label htmlFor="values-unsure" className="font-normal cursor-pointer">
                        Unsure
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.alignedWithValues && (
                    <p className="mt-1 text-sm text-destructive">{errors.alignedWithValues}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="anythingElse">
                    Is there anything you'd like us to know about you at this stage? (Optional)
                  </Label>
                  <Textarea
                    id="anythingElse"
                    rows={4}
                    value={formData.anythingElse}
                    onChange={(e) => updateField("anythingElse", e.target.value)}
                  />
                </div>
              </fieldset>

              {/* SECTION 8: Consent & Acknowledgment */}
              <fieldset className="space-y-6">
                <legend className="text-xl sm:text-2xl font-bold text-at-dark-green mb-4">Section 8: Consent & Acknowledgment</legend>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="notGuarantee"
                      checked={formData.notGuarantee}
                      onCheckedChange={(checked) => updateField("notGuarantee", checked as boolean)}
                      className={errors.notGuarantee ? "border-destructive" : ""}
                    />
                    <Label htmlFor="notGuarantee" className="font-normal cursor-pointer leading-relaxed">
                      I understand this is an application and not a guarantee of participation{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  {errors.notGuarantee && <p className="ml-7 text-sm text-destructive">{errors.notGuarantee}</p>}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="additionalScreening"
                      checked={formData.additionalScreening}
                      onCheckedChange={(checked) => updateField("additionalScreening", checked as boolean)}
                      className={errors.additionalScreening ? "border-destructive" : ""}
                    />
                    <Label htmlFor="additionalScreening" className="font-normal cursor-pointer leading-relaxed">
                      I understand additional screening, interviews, and documentation may be required{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  {errors.additionalScreening && (
                    <p className="ml-7 text-sm text-destructive">{errors.additionalScreening}</p>
                  )}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="informationAccurate"
                      checked={formData.informationAccurate}
                      onCheckedChange={(checked) => updateField("informationAccurate", checked as boolean)}
                      className={errors.informationAccurate ? "border-destructive" : ""}
                    />
                    <Label htmlFor="informationAccurate" className="font-normal cursor-pointer leading-relaxed">
                      I certify that the information provided is true to the best of my knowledge{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  {errors.informationAccurate && (
                    <p className="ml-7 text-sm text-destructive">{errors.informationAccurate}</p>
                  )}
                </div>
              </fieldset>

              {/* Submit Button */}
              <div className="pt-8">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-at-orange text-at-dark-green hover:bg-at-orange/90 shadow-lg border-2 border-at-orange font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </div>
        </section>
  )
}
