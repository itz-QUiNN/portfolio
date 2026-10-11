from datetime import date
from decimal import Decimal

from app.schemas.invoice import (
    ExtractedInvoice,
    InvoiceDemoResponse,
    InvoiceSample,
    LineItem,
    ValidationCheck,
)


class UnknownSample(KeyError):
    pass


def _invoice(*, number: str = "INV-2041", total: str = "269.50") -> ExtractedInvoice:
    return ExtractedInvoice(
        vendor="Northwind Supplies Ltd",
        invoice_number=number,
        issue_date="2026-03-14",
        currency="USD",
        line_items=[
            LineItem(description="Widget A", quantity=10, unit_price=Decimal("12.50")),
            LineItem(description="Widget B", quantity=4, unit_price=Decimal("30.00")),
        ],
        subtotal=Decimal("245.00"),
        tax=Decimal("24.50"),
        total=Decimal(total),
    )


SAMPLES: dict[str, tuple[InvoiceSample, ExtractedInvoice]] = {
    "clean": (
        InvoiceSample(
            id="clean",
            label="Clean invoice",
            description="All fields present and the totals add up.",
        ),
        _invoice(),
    ),
    "transposed-total": (
        InvoiceSample(
            id="transposed-total",
            label="Transposed total",
            description="The printed total has two digits swapped.",
        ),
        _invoice(total="296.50"),
    ),
    "missing-number": (
        InvoiceSample(
            id="missing-number",
            label="Missing invoice number",
            description="The extractor found no invoice number.",
        ),
        _invoice(number=""),
    ),
}


def list_samples() -> list[InvoiceSample]:
    return [summary for summary, _ in SAMPLES.values()]


def _valid_date(value: str) -> bool:
    try:
        date.fromisoformat(value)
    except ValueError:
        return False
    return True


def validate(invoice: ExtractedInvoice) -> list[ValidationCheck]:
    line_sum = sum((i.unit_price * i.quantity for i in invoice.line_items), Decimal("0"))
    expected_total = invoice.subtotal + invoice.tax
    return [
        ValidationCheck(
            name="Invoice number present",
            passed=bool(invoice.invoice_number.strip()),
            detail=f"Found: {invoice.invoice_number or 'nothing'}",
        ),
        ValidationCheck(
            name="Issue date is valid",
            passed=_valid_date(invoice.issue_date),
            detail=f"Found: {invoice.issue_date}",
        ),
        ValidationCheck(
            name="Line items add up to subtotal",
            passed=line_sum == invoice.subtotal,
            detail=f"Line items: {line_sum}, subtotal: {invoice.subtotal}",
        ),
        ValidationCheck(
            name="Subtotal plus tax equals total",
            passed=expected_total == invoice.total,
            detail=f"Expected: {expected_total}, printed: {invoice.total}",
        ),
    ]


def analyze(sample_id: str) -> InvoiceDemoResponse:
    if sample_id not in SAMPLES:
        raise UnknownSample(sample_id)
    _, invoice = SAMPLES[sample_id]
    checks = validate(invoice)
    return InvoiceDemoResponse(
        is_sample=True,
        sample_id=sample_id,
        fields=invoice,
        checks=checks,
        valid=all(check.passed for check in checks),
    )
