from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

class InfraRequest(BaseModel):
    projectName: str
    requirements: str
    budget: int
    cloudProvider: str

@app.post("/generate")
async def generate(req: InfraRequest):
    print(f"🧠 Oumi AI processing: {req.projectName}")

    # 1. Generate Terraform (Simulated Oumi Output)
    hcl_code = f"""
    provider "aws" {{
      region = "us-east-1"
    }}

    resource "aws_s3_bucket" "b" {{
      bucket = "stackframe-{req.projectName}-assets"
      tags = {{
        Name = "{req.projectName}"
        GeneratedBy = "Stackframe-Oumi"
      }}
    }}

    # Requirements: {req.requirements[:30]}...
    resource "aws_instance" "web" {{
      ami           = "ami-0c55b159cbfafe1f0"
      instance_type = "t3.micro"
    }}
    """

    # 2. Estimate Cost
    estimated_cost = random.randint(15, 60) # Random cost to test logic

    return {
        "hcl": hcl_code,
        "cost": estimated_cost,
        "status": "success"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)