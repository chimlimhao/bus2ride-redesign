
-- 1. Role system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admins can read roles
CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Fleet vehicles
CREATE TABLE public.fleet_vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_label TEXT,
  description TEXT,
  capacity TEXT,
  price_from TEXT,
  image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  variants JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.fleet_vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published fleet" ON public.fleet_vehicles
  FOR SELECT USING (status = 'Published');
CREATE POLICY "Admins full access fleet" ON public.fleet_vehicles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3. Events
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  description TEXT,
  event_type TEXT DEFAULT 'Event',
  image_url TEXT,
  feature_image_url TEXT,
  features TEXT[] DEFAULT '{}',
  tips TEXT[] DEFAULT '{}',
  popular_vehicles JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published events" ON public.events
  FOR SELECT USING (status = 'Published');
CREATE POLICY "Admins full access events" ON public.events
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4. Services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  features TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published services" ON public.services
  FOR SELECT USING (status = 'Published');
CREATE POLICY "Admins full access services" ON public.services
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. FAQs
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  sort_order INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published faqs" ON public.faqs
  FOR SELECT USING (status = 'Published');
CREATE POLICY "Admins full access faqs" ON public.faqs
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'Published',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published testimonials" ON public.testimonials
  FOR SELECT USING (status = 'Published');
CREATE POLICY "Admins full access testimonials" ON public.testimonials
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 7. Inquiries (from quote forms)
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT,
  event_date DATE,
  guests TEXT,
  pickup_location TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an inquiry
CREATE POLICY "Anyone can submit inquiry" ON public.inquiries
  FOR INSERT WITH CHECK (true);
-- Only admins can view/manage
CREATE POLICY "Admins full access inquiries" ON public.inquiries
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 8. Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('fleet-images', 'fleet-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('event-images', 'event-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('service-images', 'service-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('testimonial-images', 'testimonial-images', true);

-- Storage policies: public read, admin upload/update/delete
CREATE POLICY "Public read fleet images" ON storage.objects FOR SELECT USING (bucket_id = 'fleet-images');
CREATE POLICY "Admin upload fleet images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'fleet-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update fleet images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'fleet-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete fleet images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'fleet-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read event images" ON storage.objects FOR SELECT USING (bucket_id = 'event-images');
CREATE POLICY "Admin upload event images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'event-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update event images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'event-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete event images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'event-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read service images" ON storage.objects FOR SELECT USING (bucket_id = 'service-images');
CREATE POLICY "Admin upload service images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'service-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update service images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'service-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete service images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'service-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read testimonial images" ON storage.objects FOR SELECT USING (bucket_id = 'testimonial-images');
CREATE POLICY "Admin upload testimonial images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'testimonial-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update testimonial images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'testimonial-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete testimonial images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'testimonial-images' AND public.has_role(auth.uid(), 'admin'));

-- 9. Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_fleet_vehicles_updated_at BEFORE UPDATE ON public.fleet_vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
