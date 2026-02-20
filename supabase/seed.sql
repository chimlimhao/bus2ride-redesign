
-- 1. Fleet Vehicles (Total 6 from FleetCards.tsx)
INSERT INTO public.fleet_vehicles (name, slug, category_label, description, capacity, status, image_url, gallery_urls, amenities, features, variants)
VALUES 
('Party Bus', 'party-buses', 'FEATURED PARTY BUS • 24/7 BOOKING', 'Spacious party buses designed for lively celebrations and group outings. Features premium sound systems, LED lighting, and all the amenities you need for an unforgettable experience.', '20-50 passengers', 'Published', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800', 
  ARRAY['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957', 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a'], 
  ARRAY['Dance Pole (select buses)', 'Bluetooth Connectivity', 'USB Charging Ports', 'Tinted Windows', 'Professional Chauffeur', 'Ice & Cups Provided'], 
  ARRAY['Premium Sound System', 'LED Lighting & Lasers', 'Leather Seating', 'Climate Control', 'On-board Restroom', 'Mini Bar Area'], 
  '[{"name": "20 Passenger Party Bus", "passengers": "15-20", "sweetSpot": "18", "type": "Ford E-450"}, {"name": "25 Passenger Party Bus", "passengers": "20-25", "sweetSpot": "22", "type": "Freightliner"}, {"name": "30 Passenger Party Bus", "passengers": "25-30", "sweetSpot": "28", "type": "Freightliner M2"}, {"name": "40 Passenger Party Bus", "passengers": "35-40", "sweetSpot": "38", "type": "Prevost"}, {"name": "50 Passenger Party Bus", "passengers": "45-50", "sweetSpot": "48", "type": "MCI Coach"}]'),

('Stretch Limousine', 'limousines', 'FEATURED STRETCH LIMOUSINE • 24/7 BOOKING', 'Classic elegance meets modern luxury. Our stretch limousines provide the perfect setting for weddings, proms, and executive travel.', '6-18 passengers', 'Published', 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=800',
  ARRAY['https://images.unsplash.com/photo-1517400508447-f8dd518b86db'],
  ARRAY['Champagne Bucket', 'Bluetooth Audio', 'Phone Chargers', 'Bottled Water', 'Professional Chauffeur', 'Red Carpet Service'],
  ARRAY['Leather Interior', 'Mini Bar with Glassware', 'Privacy Divider', 'Premium Audio System', 'Fiber Optic Lighting'],
  '[{"name": "6 Passenger Stretch Limo", "passengers": "4-6", "sweetSpot": "6", "type": "Lincoln Town Car"}, {"name": "8 Passenger Stretch Limo", "passengers": "6-8", "sweetSpot": "8", "type": "Lincoln Navigator"}, {"name": "10 Passenger Stretch Limo", "passengers": "8-10", "sweetSpot": "10", "type": "Chrysler 300"}]'),

('Coach Bus', 'coach-buses', 'FEATURED COACH BUS • 24/7 BOOKING', 'Comfortable long-distance travel for large groups. Perfect for corporate shuttles and tour groups.', '40-56 passengers', 'Published', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800',
  ARRAY['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'],
  ARRAY['Power Outlets', 'Reading Lights', 'PA System', 'DVD Players', 'Professional Chauffeur', 'Luggage Compartment'],
  ARRAY['Panoramic Windows', 'Overhead Storage', 'On-board Restroom', 'WiFi Available', 'Climate Control', 'Reclining Seats'],
  '[{"name": "36 Passenger Coach Bus", "passengers": "30-36", "sweetSpot": "34", "type": "MCI J4500"}, {"name": "45 Passenger Coach Bus", "passengers": "40-45", "sweetSpot": "42", "type": "Prevost H3-45"}, {"name": "56 Passenger Coach Bus", "passengers": "50-56", "sweetSpot": "54", "type": "MCI D4505"}]'),

('SUV Limousine', 'suv-limos', 'FEATURED SUV LIMOUSINE • 24/7 BOOKING', 'The perfect blend of rugged style and luxurious comfort. Our SUV limousines offer more headroom and a commanding presence.', '8-14 passengers', 'Published', 'https://images.unsplash.com/photo-1562920618-9759e663972a?q=80&w=800',
  ARRAY['https://images.unsplash.com/photo-1562920618-9759e663972a'],
  ARRAY['Fiber Optic Ceiling', 'Flat Screen TV', 'Bluetooth Audio', 'Phone Chargers', 'Professional Chauffeur', 'Ice & Cups Provided'],
  ARRAY['Spacious Interior', 'Premium Sound System', 'Custom LED Lighting', 'Leather Seating', 'Mini Bar', 'Privacy Windows'],
  '[{"name": "8 Passenger SUV Limo", "passengers": "6-8", "sweetSpot": "8", "type": "Cadillac Escalade"}, {"name": "12 Passenger SUV Limo", "passengers": "10-12", "sweetSpot": "12", "type": "Lincoln Navigator"}]'),

('Executive Sedan', 'executive-sedans', 'FEATURED EXECUTIVE SEDAN • 24/7 BOOKING', 'Professional, understated elegance for corporate executives and discerning travelers.', '3-4 passengers', 'Published', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800',
  ARRAY['https://images.unsplash.com/photo-1503376780353-7e6692767b70'],
  ARRAY['Bottled Water', 'Phone Chargers', 'WiFi Available', 'Newspapers/Magazines', 'Professional Chauffeur', 'Flight Tracking'],
  ARRAY['Leather Interior', 'Rear Climate Control', 'Bluetooth Audio', 'Tinted Windows', 'Extra Legroom', 'Trunk Space for Luggage'],
  '[{"name": "3 Passenger Sedan", "passengers": "2-3", "sweetSpot": "3", "type": "Mercedes S-Class"}, {"name": "4 Passenger Sedan", "passengers": "3-4", "sweetSpot": "4", "type": "BMW 7 Series"}]'),

('Sprinter Van', 'sprinter-vans', 'FEATURED SPRINTER VAN • 24/7 BOOKING', 'Versatile luxury vans perfect for medium-sized groups. Ideal for corporate travel, wine tours, and group outings.', '10-16 passengers', 'Published', 'https://images.unsplash.com/photo-1554674810-d05370d06151?q=80&w=800',
  ARRAY['https://images.unsplash.com/photo-1554674810-d05370d06151'],
  ARRAY['WiFi Available', 'Power Outlets', 'Cooler Space', 'Bluetooth Audio', 'Professional Chauffeur', 'Tinted Windows'],
  ARRAY['Luggage Area', 'Rear AC/Heating', 'Custom Interior Lighting', 'TV & DVD Capabilities', 'Luxury Leather Interior', 'High Roof for Standing'],
  '[{"name": "10 Passenger Sprinter", "passengers": "8-10", "sweetSpot": "10", "type": "Mercedes Sprinter"}, {"name": "14 Passenger Sprinter", "passengers": "12-14", "sweetSpot": "14", "type": "Mercedes Sprinter"}]');

-- 2. Events (Total 6 from EventCards.tsx)
INSERT INTO public.events (title, slug, subtitle, description, event_type, image_url, status)
VALUES 
('Weddings', 'weddings', 'Elegant transportation for your special day', 'Make your special day unforgettable with elegant transportation. We handle all the logistics for your bridal party and guests.', 'Event', 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', 'Published'),
('Corporate Events', 'corporate', 'Professional business travel solutions', 'Professional transportation for meetings and conferences. Impress your clients with our executive fleet.', 'Event', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800', 'Published'),
('Prom & Homecoming', 'prom', 'Safe and stylish rides for school events', 'Safe and stylish rides for your special school events. Parents love our safety records, students love our features.', 'Event', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800', 'Published'),
('Bachelor & Bachelorette', 'bachelor-bachelorette', 'Party buses and limos for your celebration', 'The ultimate party experience for your last night of freedom. Our buses feature premium sound and lighting.', 'Event', 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800', 'Published'),
('Sports & Game Day', 'sports-games', 'Group transportation for tailgates and sporting events', 'Avoid the traffic and parking hassles. Ride to the stadium in comfort with your entire group of friends.', 'Event', 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=800', 'Published'),
('Concerts & Festivals', 'concerts', 'Ride in style to your favorite live events', 'Experience the show without worrying about the drive. We provide door-to-door service for all major venues.', 'Event', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800', 'Published');

-- 3. Services (Total 6 from Services.tsx)
INSERT INTO public.services (title, slug, subtitle, description, image_url, status, features)
VALUES 
('Airport Transfers', 'airport-transfers', 'Reliable pickup and drop-off service', 'Start and end your journey stress-free with our reliable airport transportation services. We track flights in real-time.', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800', 'Published', ARRAY['Real-time Flight Tracking', 'Meet & Greet Service', '24/7 Availability', 'All Major Airports']),
('Corporate Transportation', 'corporate-transportation', 'Professional business travel solutions', 'Impress clients and keep your team moving efficiently with our executive fleet. From roadshows to airport transfers.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800', 'Published', ARRAY['Executive Transfers', 'Conference Shuttles', 'Corporate Accounts', 'Account Management']),
('Group Charters', 'group-charters', 'Custom transportation for any group size', 'Whether its a school field trip or sports team travel, we provide safe and comfortable transportation for groups.', 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800', 'Published', ARRAY['School Groups', 'Sports Teams', 'Custom Itineraries', 'Flexible Scheduling']),
('Wine Tours & Tastings', 'wine-tours', 'Explore vineyards in style', 'Tour local wineries and enjoy tastings without worrying about driving. Custom itineraries and VIP access available.', 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800', 'Published', ARRAY['Custom Itineraries', 'Knowledgeable Drivers', 'VIP Access', 'Multiple Winery Stops']),
('Casino Trips', 'casino-trips', 'Round-trip casino transportation', 'Enjoy a night at the casino without the hassle of driving. Our comfortable coaches take you there and back safely.', 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=800', 'Published', ARRAY['Round-Trip Service', 'Group Packages', 'On-board Entertainment', 'Safe Return']),
('City Tours', 'city-tours', 'Explore the city in comfort', 'Discover the best sights and attractions with our guided city tours. Perfect for tourists and corporate groups.', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800', 'Published', ARRAY['Professional Guides', 'Custom Routes', 'Photo Opportunities', 'All-Day Packages']);

-- 4. Testimonials (Total 9 from Testimonials.tsx)
INSERT INTO public.testimonials (name, role, content, rating, status, avatar_url)
VALUES 
('Jennifer Martinez', 'Wedding Client', 'Bus2Ride made our wedding day absolutely perfect. The limousine was immaculate, and our chauffeur was professional and punctual. Highly recommend!', 5, 'Published', 'https://randomuser.me/api/portraits/women/1.jpg'),
('Michael Chen', 'Corporate Event Planner', 'Weve used Bus2Ride for multiple corporate events. Their coach buses are always clean, drivers are professional, and theyre incredibly reliable.', 5, 'Published', 'https://randomuser.me/api/portraits/men/2.jpg'),
('Sarah Johnson', 'Prom Parent', 'As a parent, safety was my top priority. Bus2Ride exceeded all expectations. The kids had a blast and I had complete peace of mind.', 5, 'Published', 'https://randomuser.me/api/portraits/women/3.jpg'),
('David Thompson', 'Bachelor Party', 'The party bus was a hit at my bachelor party! Great sound system, comfortable seating, and the driver was super accommodating.', 5, 'Published', 'https://randomuser.me/api/portraits/men/4.jpg'),
('Amanda Roberts', 'Corporate Client', 'Professional service from start to finish. The booking process was seamless and the vehicle exceeded our expectations.', 5, 'Published', 'https://randomuser.me/api/portraits/women/5.jpg'),
('Lisa Williams', 'HR Director', 'We used Bus2Ride for our company retreat and it was fantastic. The coach was spacious and comfortable for the long drive.', 5, 'Published', 'https://randomuser.me/api/portraits/women/6.jpg'),
('Robert Garcia', 'Wine Tour Guest', 'Outstanding experience for our wine tour! The chauffeur was knowledgeable and made the trip even more memorable.', 5, 'Published', 'https://randomuser.me/api/portraits/men/7.jpg'),
('Emily Davis', 'Business Traveler', 'Used their airport transfer service and it was impeccable. On-time pickup, clean vehicle, and courteous driver.', 5, 'Published', 'https://randomuser.me/api/portraits/women/8.jpg'),
('Maria Gonzalez', 'Quinceañera Client', 'Bus2Ride made our quinceañera extra special. The limo was beautiful and the service was top-notch!', 5, 'Published', 'https://randomuser.me/api/portraits/women/9.jpg');

-- 5. FAQs (Total 5 from Services.tsx)
INSERT INTO public.faqs (question, answer, category, status)
VALUES 
('Do you offer corporate accounts?', 'Yes! We offer corporate accounts with dedicated account managers, consolidated billing, priority booking, and volume discounts.', 'Corporate', 'Published'),
('What areas do you service?', 'We provide service throughout the greater metropolitan area and can accommodate long-distance travel. Contact us with your specific route.', 'General', 'Published'),
('How do I get a quote?', 'You can get an instant quote through our website by providing your event details, or call us directly for personalized pricing.', 'Booking', 'Published'),
('What happens if my flight is delayed?', 'We track all flights in real-time. If your flight is delayed, we automatically adjust your pickup time at no additional charge.', 'Airport', 'Published'),
('Can I make multiple stops?', 'Absolutely! Many of our services include multiple stops. Whether its a wine tour or a city tour, we can customize your itinerary.', 'General', 'Published');
