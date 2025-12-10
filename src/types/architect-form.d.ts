export type CloudProvider = "AWS" | "GCP";

export interface ArchitectFormData {
  projectName: string;
  cloudProvider: CloudProvider;
  budget: number;
  requirements: string;
}
