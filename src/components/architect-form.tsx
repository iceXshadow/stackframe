"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ArchitectFormData } from "@/types/architect-form";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

export function ArchitectForm() {
  const [formData, setFormData] = useState<ArchitectFormData>({
    projectName: "",
    cloudProvider: "AWS",
    budget: 50,
    requirements: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ArchitectFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ArchitectFormData, string>> = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }

    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = "Budget must be greater than $0";
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = "Requirements are required";
    } else if (formData.requirements.trim().length < 10) {
      newErrors.requirements = "Requirements should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsGenerating(true);

    try {
      // TODO: Implement API call to generate architecture
      console.log("Generating architecture with:", formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Error generating architecture:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const updateField = <K extends keyof ArchitectFormData>(
    field: K,
    value: ArchitectFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Cloud Architecture Generator
        </h2>
        <p className="text-muted-foreground text-sm">
          Define your project requirements and let AI design your cloud infrastructure.
        </p>
      </div>

      <div className="space-y-6">
        {/* Project Name */}
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            type="text"
            placeholder="my-blog"
            value={formData.projectName}
            onChange={(e) => updateField("projectName", e.target.value)}
            aria-invalid={!!errors.projectName}
          />
          {errors.projectName && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.projectName}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Cloud Provider */}
        <div className="space-y-2">
          <Label htmlFor="cloudProvider">Cloud Provider</Label>
          <div className="grid grid-cols-2 gap-3">
            {(["AWS", "GCP"] as const).map((provider) => (
              <button
                key={provider}
                type="button"
                onClick={() => updateField("cloudProvider", provider)}
                className={`
                  relative flex items-center justify-center h-11 px-4 rounded-md border text-sm font-medium
                  transition-all outline-none
                  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                  ${
                    formData.cloudProvider === provider
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background border-input hover:bg-accent hover:text-accent-foreground"
                  }
                `}
              >
                {provider}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget">Budget (USD)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              $
            </span>
            <Input
              id="budget"
              type="number"
              min="0"
              step="1"
              placeholder="50"
              value={formData.budget}
              onChange={(e) => updateField("budget", Number(e.target.value))}
              className="pl-7"
              aria-invalid={!!errors.budget}
            />
          </div>
          {errors.budget && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.budget}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Requirements */}
        <div className="space-y-2">
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            placeholder="I need an S3 bucket for storing images, an EC2 instance for the web server, and a PostgreSQL database..."
            value={formData.requirements}
            onChange={(e) => updateField("requirements", e.target.value)}
            rows={6}
            aria-invalid={!!errors.requirements}
          />
          {errors.requirements ? (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.requirements}</AlertDescription>
            </Alert>
          ) : (
            <p className="text-xs text-muted-foreground">
              Describe your infrastructure needs in detail
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          size="lg"
          disabled={isGenerating}
          className="min-w-[180px]"
        >
          {isGenerating ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating...
            </>
          ) : (
            "Generate Architecture"
          )}
        </Button>
      </div>
    </form>
  );
}
