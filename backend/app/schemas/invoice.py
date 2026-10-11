from decimal import Decimal

from pydantic import BaseModel, Field


class InvoiceSample(BaseModel):
    id: str
    label: str
    description: str


class LineItem(BaseModel):
    description: str
    quantity: int
    unit_price: Decimal


class ExtractedInvoice(BaseModel):
    vendor: str
    invoice_number: str
    issue_date: str
    currency: str
    line_items: list[LineItem]
    subtotal: Decimal
    tax: Decimal
    total: Decimal


class ValidationCheck(BaseModel):
    name: str
    passed: bool
    detail: str


class InvoiceDemoRequest(BaseModel):
    sample_id: str = Field(min_length=1, max_length=50)


class InvoiceDemoResponse(BaseModel):
    is_sample: bool
    sample_id: str
    fields: ExtractedInvoice
    checks: list[ValidationCheck]
    valid: bool
