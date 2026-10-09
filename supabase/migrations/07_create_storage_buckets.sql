-- ==============================================================================
-- 07_CREATE_STORAGE_BUCKETS.SQL
-- Purpose: File Storage Buckets for Payment Proofs, Complaints, Expenses, and KYC
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('payment-proofs', 'payment-proofs', true),
    ('complaints-photos', 'complaints-photos', true),
    ('expense-receipts', 'expense-receipts', true),
    ('kyc-documents', 'kyc-documents', false)
ON CONFLICT (id) DO NOTHING;
