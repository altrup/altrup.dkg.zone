DROP TRIGGER IF EXISTS handle_portfolio_changes ON public.portfolio;
DROP TRIGGER IF EXISTS handle_portfolio_v2_changes ON public.portfolio_v2;
DROP FUNCTION IF EXISTS public.portfolio_changes();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'portfolio'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'portfolio_v2'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_v2;
  END IF;
END
$$;
