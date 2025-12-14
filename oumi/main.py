from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, field_validator
import random
import logging
import os
from typing import Optional

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

# API Key Authentication
# In production, store this in environment variables or secrets manager
API_KEY = os.getenv("OUMI_API_KEY", "dev-key-change-in-production")

class InfraRequest(BaseModel):
    projectName: str = Field(..., min_length=1, max_length=100, description="Project name (1-100 characters)")
    requirements: str = Field(..., min_length=10, max_length=5000, description="Project requirements (10-5000 characters)")
    budget: int = Field(..., ge=0, le=1000000, description="Budget in USD (0-1,000,000)")
    cloudProvider: str = Field(..., description="Cloud provider (aws, azure, gcp)")
    
    @field_validator("projectName")
    @classmethod
    def validate_project_name(cls, v: str) -> str:
        """Validate project name contains only alphanumeric, dash, underscore"""
        if not all(c.isalnum() or c in '-_' for c in v):
            raise ValueError('projectName must contain only alphanumeric characters, dashes, and underscores')
        return v.lower()
    
    @field_validator("cloudProvider")
    @classmethod
    def validate_cloud_provider(cls, v: str) -> str:
        """Validate cloud provider is supported"""
        allowed = ['aws', 'azure', 'gcp']
        if v.lower() not in allowed:
            raise ValueError(f'cloudProvider must be one of: {", ".join(allowed)}')
        return v.lower()

class ErrorResponse(BaseModel):
    """Consistent error response schema"""
    error: str
    message: str
    status_code: int
    details: Optional[dict] = None

async def verify_api_key(x_api_key: str = Header(..., description="API key for authentication")):
    """
    Dependency to verify API key from request headers.
    
    In production:
    - Store API keys in a secure database or secrets manager
    - Use hashed API keys for comparison
    - Implement rate limiting per API key
    - Log authentication attempts
    - Rotate keys regularly
    """
    if x_api_key != API_KEY:
        logger.warning("Authentication failed: Invalid API key provided")
        error_response = ErrorResponse(
            error="Unauthorized",
            message="Invalid API key. Please provide a valid X-API-Key header.",
            status_code=401
        )
        return JSONResponse(
            status_code=401,
            content=error_response.model_dump()
        )
    return x_api_key

@app.post("/generate", dependencies=[Depends(verify_api_key)])
async def generate(req: InfraRequest):
    """
    Generate infrastructure code based on requirements.
    
    Requires authentication via X-API-Key header.
    """
    try:
        logger.info(f"Processing request for project: {req.projectName}")
        
        # Additional validation logic
        if req.budget < 10:
            raise ValueError("Budget must be at least $10 to generate infrastructure")
        
        if len(req.requirements.strip()) < 10:
            raise ValueError("Requirements must be at least 10 characters with meaningful content")

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
        
        logger.info(f"Successfully generated infrastructure for {req.projectName} (estimated cost: ${estimated_cost})")

        return {
            "hcl": hcl_code,
            "cost": estimated_cost,
            "status": "success",
            "message": f"Infrastructure code generated successfully for {req.projectName}"
        }
    
    except ValueError as ve:
        # Validation errors - 400 Bad Request
        logger.warning(f"Validation error for project {req.projectName}: {str(ve)}")
        error_response = ErrorResponse(
            error="ValidationError",
            message=str(ve),
            status_code=400,
            details={
                "projectName": req.projectName,
                "cloudProvider": req.cloudProvider
            }
        )
        return JSONResponse(
            status_code=400,
            content=error_response.model_dump()
        )
    
    except Exception as e:
        # Unexpected errors - 500 Internal Server Error
        logger.error(f"Unexpected error processing request for {req.projectName}: {str(e)}", exc_info=True)
        error_response = ErrorResponse(
            error="InternalServerError",
            message="An unexpected error occurred while generating infrastructure code. Please try again later.",
            status_code=500,
            details={
                "projectName": req.projectName,
                "error_type": type(e).__name__
            }
        )
        return JSONResponse(
            status_code=500,
            content=error_response.model_dump()
        )

@app.get("/health")
async def health_check():
    """Health check endpoint (no authentication required)"""
    return {"status": "healthy", "service": "oumi-engine"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)