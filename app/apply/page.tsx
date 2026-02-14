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

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
            <h1 className="text-balance text-3xl font-bold tracking-tight text-at-blue sm:text-4xl lg:text-5xl text-center">
              Adventure Therapy Application
            </h1>

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

            <form
              action="https://formsubmit.co/chris@adventuretherapy.co"
              method="POST"
              className="mt-12 space-y-12"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://adventure-therapy.vercel.app/thank-you" />
              {/* SECTION 1: Basic Applicant Information */}
              <fieldset className="space-y-6">
                <legend className="text-xl sm:text-2xl font-bold text-at-blue mb-4">Section 1: Basic Applicant Information</legend>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="full_name"
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
                      name="preferred_name"
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
                      name="email"
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
                      name="phone"
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
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateField("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
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
                          name="use_date_of_birth"
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
                          name="date_of_birth"
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
                          name="age"
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
                    <Select value={formData.gender} onValueChange={(value) => updateField("gender", value)} name="gender">
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
                    {formData.gender && <input type="hidden" name="gender" value={formData.gender} />}
                  </div>
                </div>
              </fieldset>

              {/* SECTION 2: Program Category Selection */}
              <fieldset className="space-y-6">
                <legend className="text-xl sm:text-2xl font-bold text-at-blue mb-4">Section 2: Program Category Selection</legend>

                <div>
                  <Label>
                    Which Adventure Therapy program are you applying for? <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.programCategory}
                    onValueChange={(value) => updateField("programCategory", value as ProgramCategory)}
                    name="program_category"
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="veterans" id="veterans" name="program_category" required />
                      <Label htmlFor="veterans" className="font-normal cursor-pointer">
                        Veterans & First Responders
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="recovery" id="recovery" name="program_category" />
                      <Label htmlFor="recovery" className="font-normal cursor-pointer">
                        Individuals in Recovery from Substance Use Disorders
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="couples" id="couples" name="program_category" />
                      <Label htmlFor="couples" className="font-normal cursor-pointer">
                        Couples Struggling in Marriage
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.programCategory && <input type="hidden" name="program_category" value={formData.programCategory} />}
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
                        name="partner_name"
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
                        name="partner_email"
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
                      name="branch_or_role"
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
                <legend className="text-xl sm:text-2xl font-bold text-at-blue mb-4">Section 3: Connection to the Program</legend>

                <div>
                  <Label htmlFor="whatDrewYou">
                    In your own words, what drew you to Adventure Therapy? <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="whatDrewYou"
                    name="what_drew_you"
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
                    name="hoping_to_gain"
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
                    name="participated_before"
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="participated-yes" name="participated_before" />
                      <Label htmlFor="participated-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="participated-no" name="participated_before" />
                      <Label htmlFor="participated-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.participatedBefore && <input type="hidden" name="participated_before" value={formData.participatedBefore} />}
                  {formData.participatedBefore === "yes" && (
                    <div className="mt-4">
                      <Label htmlFor="participatedDescription">Brief description (optional)</Label>
                      <Textarea
                        id="participatedDescription"
                        name="participated_description"
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
                <legend className="text-xl sm:text-2xl font-bold text-at-blue mb-4">
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
                    name="physical_activity"
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="physical-yes" name="physical_activity" required />
                      <Label htmlFor="physical-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="with-limitations" id="physical-limitations" name="physical_activity" />
                      <Label htmlFor="physical-limitations" className="font-normal cursor-pointer">
                        With some limitations
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="physical-no" name="physical_activity" />
                      <Label htmlFor="physical-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.physicalActivity && <input type="hidden" name="physical_activity" value={formData.physicalActivity} />}
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
                    name="emotional_readiness"
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="emotional-yes" name="emotional_readiness" required />
                      <Label htmlFor="emotional-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unsure" id="emotional-unsure" name="emotional_readiness" />
                      <Label htmlFor="emotional-unsure" className="font-normal cursor-pointer">
                        Unsure
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="emotional-no" name="emotional_readiness" />
                      <Label htmlFor="emotional-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.emotionalReadiness && <input type="hidden" name="emotional_readiness" value={formData.emotionalReadiness} />}
                  {errors.emotionalReadiness && (
                    <p className="mt-1 text-sm text-destructive">{errors.emotionalReadiness}</p>
                  )}
                </div>

                <div>
                  <Label>Are you currently working with any professional supports (therapist, counselor, sponsor, etc.)?</Label>
                  <RadioGroup
                    value={formData.professionalSupports}
                    onValueChange={(value) => updateField("professionalSupports", value)}
                    name="professional_supports"
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="supports-yes" name="professional_supports" />
                      <Label htmlFor="supports-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="supports-no" name="professional_supports" />
                      <Label htmlFor="supports-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefer-not-to-say" id="supports-prefer-not" name="professional_supports" />
                      <Label htmlFor="supports-prefer-not" className="font-normal cursor-pointer">
                        Prefer not to say
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.professionalSupports && <input type="hidden" name="professional_supports" value={formData.professionalSupports} />}
                </div>
              </fieldset>

              {/* SECTION 5: Category-Specific Questions */}
              {formData.programCategory && (
                <fieldset className="space-y-6">
                  <legend className="text-xl sm:text-2xl font-bold text-at-blue mb-4">
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
                              name="service_background[]"
                              value="veteran"
                              required
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
                              name="service_background[]"
                              value="active"
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
                              name="service_background[]"
                              value="first-responder"
                              checked={formData.serviceBackground.includes("first-responder")}
                              onCheckedChange={() => toggleServiceBackground("first-responder")}
                            />
                            <Label htmlFor="service-first-responder" className="font-normal cursor-pointer">
                              First Responder (Fire, EMS, Law Enforcement, Dispatch, etc.)
                            </Label>
                          </div>
                        </div>
                        {formData.serviceBackground.map((value) => (
                          <input key={value} type="hidden" name="service_background[]" value={value} />
                        ))}
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
                          name="experiencing_isolation"
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="isolation-yes" name="experiencing_isolation" />
                            <Label htmlFor="isolation-yes" className="font-normal cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="isolation-no" name="experiencing_isolation" />
                            <Label htmlFor="isolation-no" className="font-normal cursor-pointer">
                              No
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="prefer-not-to-say" id="isolation-prefer-not" name="experiencing_isolation" />
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
                          name="in_recovery"
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="recovery-yes" name="in_recovery" required />
                            <Label htmlFor="recovery-yes" className="font-normal cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="recovery-no" name="in_recovery" />
                            <Label htmlFor="recovery-no" className="font-normal cursor-pointer">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                        {formData.inRecovery && <input type="hidden" name="in_recovery" value={formData.inRecovery} />}
                        {errors.inRecovery && <p className="mt-1 text-sm text-destructive">{errors.inRecovery}</p>}
                      </div>

                      <div>
                        <Label>
                          How long have you been in recovery? <span className="text-destructive">*</span>
                        </Label>
                        <RadioGroup
                          value={formData.recoveryLength}
                          onValueChange={(value) => updateField("recoveryLength", value)}
                          name="recovery_length"
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="less-than-6" id="recovery-less-6" name="recovery_length" required />
                            <Label htmlFor="recovery-less-6" className="font-normal cursor-pointer">
                              Less than 6 months
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="6-12" id="recovery-6-12" name="recovery_length" />
                            <Label htmlFor="recovery-6-12" className="font-normal cursor-pointer">
                              6–12 months
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1-plus" id="recovery-1-plus" name="recovery_length" />
                            <Label htmlFor="recovery-1-plus" className="font-normal cursor-pointer">
                              1+ years
                            </Label>
                          </div>
                        </RadioGroup>
                        {formData.recoveryLength && <input type="hidden" name="recovery_length" value={formData.recoveryLength} />}
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
                          name="recovery_support"
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="recovery-support-yes" name="recovery_support" />
                            <Label htmlFor="recovery-support-yes" className="font-normal cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="recovery-support-no" name="recovery_support" />
                            <Label htmlFor="recovery-support-no" className="font-normal cursor-pointer">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                        {formData.recoverySupport && <input type="hidden" name="recovery_support" value={formData.recoverySupport} />}
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
                          name="together_length"
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
                          name="both_partners_willing"
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="partners-willing-yes" name="both_partners_willing" required />
                            <Label htmlFor="partners-willing-yes" className="font-normal cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="partners-willing-no" name="both_partners_willing" />
                            <Label htmlFor="partners-willing-no" className="font-normal cursor-pointer">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                        {formData.bothPartnersWilling && <input type="hidden" name="both_partners_willing" value={formData.bothPartnersWilling} />}
                        {errors.bothPartnersWilling && (
                          <p className="mt-1 text-sm text-destructive">{errors.bothPartnersWilling}</p>
                        )}
                      </div>

                      <div>
                        <Label>Are you currently in couples counseling or open to professional support?</Label>
                        <RadioGroup
                          value={formData.couplesCounseling}
                          onValueChange={(value) => updateField("couplesCounseling", value)}
                          name="couples_counseling"
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="counseling-yes" name="couples_counseling" />
                            <Label htmlFor="counseling-yes" className="font-normal cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="counseling-no" name="couples_counseling" />
                            <Label htmlFor="counseling-no" className="font-normal cursor-pointer">
                              No
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="unsure" id="counseling-unsure" name="couples_counseling" />
                            <Label htmlFor="counseling-unsure" className="font-normal cursor-pointer">
                              Unsure
                            </Label>
                          </div>
                        </RadioGroup>
                        {formData.couplesCounseling && <input type="hidden" name="couples_counseling" value={formData.couplesCounseling} />}
                      </div>
                    </div>
                  )}
                </fieldset>
              )}

              {/* SECTION 6: Logistics & Commitment */}
              <fieldset className="space-y-6">
                <legend className="text-xl sm:text-2xl font-bold text-at-blue mb-4">Section 6: Logistics & Commitment</legend>

                <div>
                  <Label>
                    Are you able to commit to a 5–6 day, fully immersive experience (travel, lodging, activities)?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.ableToCommit}
                    onValueChange={(value) => updateField("ableToCommit", value)}
                    name="able_to_commit"
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="commit-yes" name="able_to_commit" required />
                      <Label htmlFor="commit-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="possibly" id="commit-possibly" name="able_to_commit" />
                      <Label htmlFor="commit-possibly" className="font-normal cursor-pointer">
                        Possibly (with coordination)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="commit-no" name="able_to_commit" />
                      <Label htmlFor="commit-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.ableToCommit && <input type="hidden" name="able_to_commit" value={formData.ableToCommit} />}
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
                    name="financial_assistance"
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="financial-yes" name="financial_assistance" required />
                      <Label htmlFor="financial-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="partial" id="financial-partial" name="financial_assistance" />
                      <Label htmlFor="financial-partial" className="font-normal cursor-pointer">
                        Partial assistance
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="financial-no" name="financial_assistance" />
                      <Label htmlFor="financial-no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.financialAssistance && <input type="hidden" name="financial_assistance" value={formData.financialAssistance} />}
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
                    name="dietary_accessibility"
                    rows={3}
                    value={formData.dietaryAccessibility}
                    onChange={(e) => updateField("dietaryAccessibility", e.target.value)}
                  />
                </div>
              </fieldset>

              {/* SECTION 7: Values & Group Fit */}
              <fieldset className="space-y-6">
                <legend className="text-xl sm:text-2xl font-bold text-at-blue mb-4">Section 7: Values & Group Fit</legend>

                <div>
                  <Label>
                    Adventure Therapy experiences involve group connection, respect, accountability, and openness. Do you
                    feel aligned with these values? <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.alignedWithValues}
                    onValueChange={(value) => updateField("alignedWithValues", value)}
                    name="aligned_with_values"
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="values-yes" name="aligned_with_values" required />
                      <Label htmlFor="values-yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unsure" id="values-unsure" name="aligned_with_values" />
                      <Label htmlFor="values-unsure" className="font-normal cursor-pointer">
                        Unsure
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.alignedWithValues && <input type="hidden" name="aligned_with_values" value={formData.alignedWithValues} />}
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
                    name="anything_else"
                    rows={4}
                    value={formData.anythingElse}
                    onChange={(e) => updateField("anythingElse", e.target.value)}
                  />
                </div>
              </fieldset>

              {/* SECTION 8: Consent & Acknowledgment */}
              <fieldset className="space-y-6">
                <legend className="text-xl sm:text-2xl font-bold text-at-blue mb-4">Section 8: Consent & Acknowledgment</legend>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="notGuarantee"
                      name="not_guarantee"
                      required
                      checked={formData.notGuarantee}
                      onCheckedChange={(checked) => updateField("notGuarantee", checked as boolean)}
                      className={errors.notGuarantee ? "border-destructive" : ""}
                    />
                    {formData.notGuarantee && <input type="hidden" name="not_guarantee" value="on" />}
                    <Label htmlFor="notGuarantee" className="font-normal cursor-pointer leading-relaxed">
                      I understand this is an application and not a guarantee of participation{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  {errors.notGuarantee && <p className="ml-7 text-sm text-destructive">{errors.notGuarantee}</p>}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="additionalScreening"
                      name="additional_screening"
                      required
                      checked={formData.additionalScreening}
                      onCheckedChange={(checked) => updateField("additionalScreening", checked as boolean)}
                      className={errors.additionalScreening ? "border-destructive" : ""}
                    />
                    {formData.additionalScreening && <input type="hidden" name="additional_screening" value="on" />}
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
                      name="information_accurate"
                      required
                      checked={formData.informationAccurate}
                      onCheckedChange={(checked) => updateField("informationAccurate", checked as boolean)}
                      className={errors.informationAccurate ? "border-destructive" : ""}
                    />
                    {formData.informationAccurate && <input type="hidden" name="information_accurate" value="on" />}
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
                <button
                  type="submit"
                  className="w-full bg-at-orange text-at-dark-green hover:bg-at-orange/90 shadow-lg border-2 border-at-orange font-semibold h-11 px-8 rounded-md text-base"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </section>
  )
}
