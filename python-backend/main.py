from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="HelloCustomer Optional API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=[], allow_credentials=False, allow_methods=["GET"], allow_headers=["*"])

@app.get("/health")
def health():
    return {"ok": True, "service": "hellocustomer-python-api"}
