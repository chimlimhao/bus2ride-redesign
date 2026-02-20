
-- TRUNCATE TABLES TO ENSURE FRESH SEED
TRUNCATE TABLE public.pages_content RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.site_settings RESTART IDENTITY CASCADE;

-- 1. GLOBAL SITE SETTINGS
INSERT INTO public.site_settings (key, value, description)
VALUES 
('site_name', 'Bus2Ride', 'The name of the company'),
('contact_email', 'info@bus2ride.com', 'Primary business email'),
('contact_phone', '888-535-2566', 'Primary contact phone'),
('contact_address', 'Nationwide Service', 'Official business address'),
('social_facebook', 'https://facebook.com/bus2ride', 'Facebook profile link'),
('social_instagram', 'https://instagram.com/bus2ride', 'Instagram profile link'),
('social_twitter', 'https://twitter.com/bus2ride', 'Twitter profile link'),
('logo_url', '/logo.png', 'Path to the site logo');

-- 2. HOME PAGE CONTENT
INSERT INTO public.pages_content (slug, section_id, content, seo)
VALUES 
('home', 'top-banner', '{
  "active": true,
  "items": [
    {"icon": "Truck", "text": "🚌 Free Quote on Party Buses", "link": "/fleet"},
    {"icon": "Gift", "text": "🎉 15% OFF Wedding Packages", "link": "/services"},
    {"icon": "Tag", "text": "✨ Book Today & Get VIP Treatment", "link": "/contact"}
  ]
}', '{}'),

('home', 'hero', '{
  "badge": "Premium Fleet Rentals",
  "title": "Group Transport",
  "highlighted": "Made Easy",
  "subtitle": "Instant quotes, transparent pricing, and meticulously maintained vehicles for weddings, proms, corporate events, and more.",
  "image_fallback": "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2048",
  "video_url": "https://cdn.coverr.co/videos/coverr-driving-through-the-city-at-night-5639/1080p.mp4",
  "cta_primary": "Get Instant Quote",
  "cta_secondary": "View Our Fleet",
  "stats": [
    {"value": "98%", "label": "On-Time Rate"},
    {"value": "15K+", "label": "Happy Customers"},
    {"value": "150+", "label": "Premium Vehicles"},
    {"value": "4.9", "label": "Rating"}
  ]
}', '{ "title": "Bus2Ride | Premium Luxury Transportation", "description": "Book luxury party buses, limousines, and coach buses for your next event. Instant quotes and professional service." }'),

('home', 'how-it-works', '{
  "title": "How It",
  "highlighted": "Works",
  "subtitle": "No hidden fees, no complicated process. Just simple, transparent booking.",
  "steps": [
    {"title": "Request a Quote", "description": "Tell us your event details—date, location, group size—and get an instant estimate."},
    {"title": "Confirm Your Booking", "description": "Review your options, select your vehicle, and lock in your reservation with a deposit."},
    {"title": "Enjoy the Ride", "description": "Your professional chauffeur arrives on time. Sit back, relax, and enjoy the experience."}
  ]
}', '{}'),

('home', 'affiliate', '{
  "title": "Enhance Your",
  "highlighted": "Travel Experience",
  "subtitle": "Discover handpicked guides and resources to help you plan the perfect group trip or celebration.",
  "products": [
    {"id": "1", "title": "Ultimate Road Trip Planner", "description": "Complete guide to planning unforgettable group road trips with itineraries, budgeting tips, and hidden gems.", "commission": "75%", "category": "Travel Guides", "link": "#", "rating": 4.8},
    {"id": "2", "title": "Event Planning Masterclass", "description": "Professional event planning course covering everything from corporate events to destination weddings.", "commission": "50%", "category": "Events", "link": "#", "rating": 4.9},
    {"id": "3", "title": "Party on Wheels Guide", "description": "Expert tips for hosting unforgettable mobile celebrations, from bachelor parties to birthday bashes.", "commission": "60%", "category": "Entertainment", "link": "#", "rating": 4.7}
  ]
}', '{}'),

-- 3. ABOUT PAGE CONTENT
('about', 'hero', '{
  "title": "About",
  "highlighted": "Bus2Ride",
  "subtitle": "Premium group transportation trusted by thousands since 2008.",
  "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069"
}', '{ "title": "About Us | Bus2Ride", "description": "Learn about the history and values of Bus2Ride, your premier luxury transport partner since 2008." }'),

('about', 'story', '{
  "badge": "Our Story",
  "title": "Redefining",
  "highlighted": "Luxury Transportation",
  "paragraphs": [
    "Founded in 2008, Bus2Ride began with a simple vision: to provide exceptional group transportation that combines luxury, reliability, and outstanding service.",
    "What started as a single party bus operation has grown into a nationwide network of premium vehicles, serving everything from intimate wedding parties to large corporate events.",
    "Today, we''re proud to have transported over 50,000 satisfied customers across all 50 states, maintaining a 98% on-time rate and earning countless five-star reviews along the way."
  ],
  "image": "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070",
  "exp_value": "15+",
  "exp_label": "Years of Excellence"
}', '{}'),

('about', 'stats', '{
  "items": [
    {"value": "15+", "label": "Years of Experience"},
    {"value": "50K+", "label": "Happy Customers"},
    {"value": "98%", "label": "On-Time Rate"},
    {"value": "500+", "label": "Vehicles Nationwide"}
  ]
}', '{}'),

('about', 'values', '{
  "title": "What Sets Us",
  "highlighted": "Apart",
  "items": [
    {"title": "Safety First", "description": "All our vehicles undergo rigorous safety inspections and our drivers are fully licensed, insured, and background-checked."},
    {"title": "Premium Quality", "description": "We maintain the highest standards for our fleet, ensuring every vehicle is immaculate and equipped with luxury amenities."},
    {"title": "Punctuality", "description": "With a 98% on-time rate, you can trust us to get you where you need to be, exactly when you need to be there."},
    {"title": "Customer Focus", "description": "Your satisfaction is our priority. Our team goes above and beyond to make every journey memorable."}
  ]
}', '{}'),

('about', 'journey', '{
  "title": "Company",
  "highlighted": "Milestones",
  "milestones": [
    {"year": "2008", "event": "Bus2Ride founded with a single party bus"},
    {"year": "2012", "event": "Expanded fleet to include luxury limousines"},
    {"year": "2015", "event": "Launched nationwide service coverage"},
    {"year": "2018", "event": "Reached 25,000 satisfied customers"},
    {"year": "2021", "event": "Introduced eco-friendly vehicle options"},
    {"year": "2024", "event": "Serving over 50,000 happy customers"}
  ]
}', '{}'),

-- 4. FLEET PAGE CONTENT
('fleet', 'hero', '{
  "title": "Our",
  "highlighted": "Fleet",
  "subtitle": "From intimate limousines to full-size coach buses, we have the perfect vehicle for every occasion.",
  "image": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2048"
}', '{ "title": "Our Fleet | Bus2Ride", "description": "Explore our world-class fleet of limousines, party buses, and coach buses. Find the perfect ride for your event." }'),

('fleet', 'faqs', '{
  "subtitle": "Get answers to common questions about our fleet and booking process.",
  "items": [
    {"question": "How far in advance should I book?", "answer": "We recommend booking at least 2-4 weeks in advance for standard events, and 2-3 months for peak season events like proms and weddings."},
    {"question": "What is included in the rental price?", "answer": "All rentals include a professional chauffeur, fuel, standard gratuity, and basic amenities (ice, cups, etc)."},
    {"question": "Can I see the vehicle before booking?", "answer": "Absolutely! We encourage clients to schedule a viewing of the vehicle. Contact us to arrange a visit."},
    {"question": "What is your cancellation policy?", "answer": "Cancellations made 7+ days before the event receive a full refund minus a small administrative fee."},
    {"question": "Do you offer hourly or one-way rates?", "answer": "Yes, we offer flexible pricing options including hourly rates, one-way transfers, and point-to-point packages."}
  ]
}', '{}'),

-- 5. EVENTS PAGE CONTENT
('events', 'hero', '{
  "title": "Events We",
  "highlighted": "Serve",
  "subtitle": "From intimate gatherings to large corporate events, we provide premium transportation tailored to your occasion.",
  "image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2048"
}', '{ "title": "Events We Serve | Bus2Ride", "description": "Luxury transportation for weddings, proms, corporate events, bachelor parties, and more." }'),

('events', 'faqs', '{
  "subtitle": "Get answers to common questions about event transportation.",
  "items": [
    {"question": "How many passengers can you accommodate?", "answer": "We can accommodate groups from 4 to 56 passengers in a single vehicle, and can coordinate multiple vehicles for larger events."},
    {"question": "Do you provide decorations for special events?", "answer": "Yes! For weddings we offer Just Married signs and can accommodate custom decorations."},
    {"question": "What about alcohol on the vehicles?", "answer": "Adults 21+ may bring their own alcohol on party buses and limousines. We provide ice, cups, and glassware."},
    {"question": "Can you handle multiple pickup locations?", "answer": "Absolutely! We regularly coordinate pickups from multiple locations for large group events."},
    {"question": "What safety measures do you have in place?", "answer": "Drivers are licensed and background-checked. Vehicles are inspected regularly and meet all safety requirements."}
  ]
}', '{}'),

-- 6. SERVICES PAGE CONTENT
('services', 'hero', '{
  "title": "Our",
  "highlighted": "Services",
  "subtitle": "Professional transportation solutions tailored to your needs. From airport transfers to wine tours, we''ve got you covered.",
  "image": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2048"
}', '{ "title": "Our Services | Bus2Ride", "description": "Professional transportation solutions tailored to your needs. From airport transfers to wine tours." }'),

('services', 'features', '{
  "items": [
    {"title": "24/7 Availability", "description": "Round-the-clock service for all your transportation needs."},
    {"title": "Safety First", "description": "Licensed, insured, and rigorously maintained vehicles."},
    {"title": "GPS Tracking", "description": "Real-time tracking for peace of mind."},
    {"title": "Dedicated Support", "description": "Personal account managers for corporate clients."}
  ]
}', '{}'),

-- 7. PRICING PAGE CONTENT
('pricing', 'hero', '{
  "title": "Transparent",
  "highlighted": "Pricing",
  "subtitle": "No hidden fees. Get a clear quote for your luxury transportation needs.",
  "image": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070"
}', '{ "title": "Transparent Pricing | Bus2Ride", "description": "Clear, upfront pricing with no hidden fees for all our luxury transportation services." }'),

('pricing', 'tiers', '{
  "title": "Vehicle",
  "highlighted": "Pricing",
  "subtitle": "Prices vary based on date, time, and specific requirements. Contact us for an accurate quote.",
  "items": [
    {"name": "Luxury Sedan", "description": "Perfect for airport transfers and executive travel", "price": "$75 - $150", "unit": "per hour", "passengers": "Up to 3 passengers", "popular": false, "features": ["Professional chauffeur", "Leather interior", "Complimentary water", "Flight tracking", "Meet & greet"]},
    {"name": "Limousine", "description": "Ideal for weddings, proms, and special occasions", "price": "$150 - $300", "unit": "per hour", "passengers": "Up to 10 passengers", "popular": true, "features": ["Professional chauffeur", "Premium sound system", "LED lighting", "Champagne service", "Red carpet service"]},
    {"name": "Party Bus", "description": "The ultimate party experience on wheels", "price": "$200 - $500", "unit": "per hour", "passengers": "Up to 40 passengers", "popular": false, "features": ["Professional chauffeur", "Dance floor & poles", "Premium audio", "Multiple TV screens", "On-board restroom"]},
    {"name": "Coach Bus", "description": "Comfortable group transportation for any distance", "price": "$150 - $400", "unit": "per hour", "passengers": "Up to 56 passengers", "popular": false, "features": ["Professional driver", "Reclining seats", "Climate control", "On-board restroom", "WiFi & Power outets"]}
  ]
}', '{}'),

('pricing', 'comparison', '{
  "title": "Vehicle",
  "highlighted": "Comparison",
  "subtitle": "Find the perfect vehicle for your needs with our detailed feature comparison.",
  "categories": [
    {"name": "Sedan", "price": "$75-150/hr", "passengers": "3-4"},
    {"name": "SUV Limo", "price": "$125-200/hr", "passengers": "6-14"},
    {"name": "Stretch Limo", "price": "$150-300/hr", "passengers": "6-18"},
    {"name": "Party Bus", "price": "$200-500/hr", "passengers": "20-50"},
    {"name": "Coach Bus", "price": "$150-400/hr", "passengers": "36-56"},
    {"name": "Sprinter Van", "price": "$100-175/hr", "passengers": "10-16"}
  ]
}', '{}'),

('pricing', 'faqs', '{
  "items": [
    {"question": "How are prices calculated?", "answer": "Prices are based on vehicle type, duration, distance, and time of year."},
    {"question": "Is there a minimum rental time?", "answer": "Yes, most vehicles have a 3-4 hour minimum, depending on the day."},
    {"question": "What''s included in the price?", "answer": "Price includes the vehicle, chauffeur, fuel, and standard amenities. Gratuity is typically extra."},
    {"question": "Do you offer package deals?", "answer": "Yes! We have special packages for weddings, proms, and corporate events."},
    {"question": "What is your cancellation policy?", "answer": "14+ days for full refund (minus deposit). 7-14 days for 50%. Less than 7 days is non-refundable."},
    {"question": "Are there any additional fees?", "answer": "Additional fees may apply for overtime, extra stops, or out-of-area pickups."}
  ]
}', '{}'),

-- 8. CONTACT PAGE CONTENT
('contact', 'hero', '{
  "title": "Contact",
  "highlighted": "Us",
  "subtitle": "Get in touch with our team for bookings, questions, or custom quotes.",
  "image": "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074"
}', '{ "title": "Contact Us | Bus2Ride", "description": "Get in touch with the Bus2Ride team for bookings, questions, or custom quotes. Available 24/7." }'),

('contact', 'info', '{
  "items": [
    {"title": "Phone", "content": "888-535-2566", "description": "Available 24/7 for reservations", "link": "tel:888-535-2566"},
    {"title": "Email", "content": "info@bus2ride.com", "description": "We respond within 2 hours", "link": "mailto:info@bus2ride.com"},
    {"title": "Service Area", "content": "Nationwide Service", "description": "We operate across all 50 states", "link": null},
    {"title": "Hours", "content": "24/7 Support", "description": "Always here when you need us", "link": null}
  ]
}', '{}'),

-- 9. GLOBAL CTA SECTION (Used on most pages)
('global', 'cta', '{
  "title": "Ready to Book Your",
  "highlighted": "Premium Ride?",
  "subtitle": "Get an instant quote in under 60 seconds. No obligation, no hidden fees.",
  "primary_cta": "Get Instant Quote",
  "secondary_cta": "Call 888-535-2566",
  "bottom_text": "Available 24/7 · Response within 1 hour · Free cancellation up to 48 hours before"
}', '{}');
