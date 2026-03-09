-- C&N Seed Script
-- Run this script to populate demo data for local development

-- Insert demo users (passwords should be set via Supabase Auth)
INSERT INTO users (id, username, email, role, is_creator, is_verified, created_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'DemoCreator', 'demo@cn.com', 'creator', true, true, NOW()),
  ('22222222-2222-2222-2222-222222222222', 'DemoUser', 'user@cn.com', 'user', false, false, NOW()),
  ('33333333-3333-3333-3333-333333333333', 'StoryMaster', 'author@cn.com', 'creator', true, true, NOW());

-- Insert demo genres
INSERT INTO genres (id, name, slug) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Action', 'action'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Fantasy', 'fantasy'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Romance', 'romance'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Comedy', 'comedy'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Horror', 'horror'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Sci-Fi', 'sci-fi'),
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', 'Adventure', 'adventure'),
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'Drama', 'drama');

-- Insert demo series
INSERT INTO series (id, slug, title, cover, banner, author, artist, description, type, status, content_type, views, likes, follows, rating_sum, rating_count, total_chapters, user_id, created_at) VALUES
  ('aaaaaaaa-0000-0000-0000-000000000001', 'solo-leveling', 'Solo Leveling', 'https://picsum.photos/seed/solo/300/450', 'https://picsum.photos/seed/solo/1200/400', 'Chugong', 'Dubu (Redice Studio)', 'In a world where hunters, humans who possess magical abilities, must battle deadly monsters to protect the human race from certain annihilation, a notoriously weak hunter named Sung Jinwoo finds himself in a seemingly endless struggle for survival. One day, after narrowly surviving an overwhelmingly powerful double dungeon that nearly wipes out his entire party, a mysterious program called the System selects him as its sole player and in turn, gives him the extremely rare ability to level up in strength, possibly beyond any known limits. Jinwoo then sets out on a journey as he fights against all kinds of enemies, both man and monster, to discover the secrets of the dungeons and the true source of his powers.', 'comic', 'ongoing', 'manhwa', 1250000, 98000, 45000, 4, 50000, 179, '11111111-1111-1111-1111-111111111111', NOW()),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'omniscient-reader', 'Omniscient Reader''s Viewpoint', 'https://picsum.photos/seed/omni/300/450', 'https://picsum.photos/seed/omni/1200/400', 'Sing-Shong', 'REDICE', 'Only the reader knows the ending. Kim Dokja is a corporate slave who spends his free time reading web novels. One day, he reads the final chapter of the popular web novel &quot;Three Ways to Survive a Apocalypse&quot; and discovers that he has transmigrated into the novel world as its protagonist. With his knowledge of the novel and its ending, Kim Dokja must navigate the dangerous world of the novel, making choices that will determine the fate of the world.', 'novel', 'ongoing', 'manhwa', 890000, 72000, 32000, 4, 45000, 180, '11111111-1111-1111-1111-111111111111', NOW()),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'tower-of-god', 'Tower of God', 'https://picsum.photos/seed/tower/300/450', 'https://picsum.photos/seed/tower/1200/400', 'SIU', 'SIU', 'Tower of God is a webtoon by SIU (also known as Sing-Shong). It tells the story of Bam, a young man who enters the Tower, a mysterious structure that is said to grant the wishes of anyone who reaches the top. Inside the Tower, there are many floors called &quot;floors&quot; that are filled with tests, and each floor has a &quot;floor administrator&quot; who governs it. Bam must pass these tests to climb the Tower, and along the way, he meets many friends and enemies.', 'comic', 'ongoing', 'manhwa', 2100000, 156000, 67000, 5, 80000, 580, '11111111-1111-1111-1111-111111111111', NOW()),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'lunar-star', 'Lunar Star', 'https://picsum.photos/seed/lunar/300/450', 'https://picsum.photos/seed/lunar/1200/400', 'Kakao', 'Kakao', 'A young girl discovers her destiny as the legendary Lunar Star warrior. She must gather the ancient artifacts to save the world from eternal darkness.', 'novel', 'ongoing', 'manhwa', 450000, 35000, 15000, 4, 20000, 120, '33333333-3333-3333-3333-333333333333', NOW()),
  ('aaaaaaaa-0000-0000-0000-000000000005', 'dragon-ascension', 'Dragon Ascension', 'https://picsum.photos/seed/dragon/300/450', 'https://picsum.photos/seed/dragon/1200/400', 'Webnovel', 'Webnovel', 'A dragon awakens after a thousand-year slumber to find the world has changed. He must adapt to the new world while protecting his descendants.', 'novel', 'ongoing', 'manga', 780000, 56000, 21000, 4, 35000, 250, '33333333-3333-3333-3333-333333333333', NOW()),
  ('aaaaaaaa-0000-0000-0000-000000000006', 'rebirth-throne', 'Rebirth of the Divine Throne', 'https://picsum.photos/seed/rebirth/300/450', 'https://picsum.photos/seed/rebirth/1200/400', 'MTT', 'MTT', 'After being betrayed and killed, a prince discovers he has been reborn in a world of martial arts. He must reclaim his throne and exact revenge.', 'novel', 'completed', 'manhua', 890000, 78000, 28000, 5, 42000, 200, '33333333-3333-3333-3333-333333333333', NOW());

-- Insert series-genres relationships
INSERT INTO series_genres (series_id, genre_id) VALUES
  ('aaaaaaaa-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'gggggggg-gggg-gggg-gggg-gggggggggggg'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  ('aaaaaaaa-0000-0000-0000-000000000005', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('aaaaaaaa-0000-0000-0000-000000000005', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  ('aaaaaaaa-0000-0000-0000-000000000006', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('aaaaaaaa-0000-0000-0000-000000000006', 'dddddddd-dddd-dddd-dddd-dddddddddddd');

-- Insert demo chapters for Solo Leveling
INSERT INTO chapters (id, series_id, chapter_number, title, content, pages, is_paid, price, views, likes, created_at) VALUES
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 1, 'The Beginning', 'Chapter 1 content...', ARRAY['https://picsum.photos/seed/ch1/800/1200', 'https://picsum.photos/seed/ch1b/800/1200'], false, 0, 50000, 500, NOW()),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 2, 'The Hunter''s Test', 'Chapter 2 content...', ARRAY['https://picsum.photos/seed/ch2/800/1200', 'https://picsum.photos/seed/ch2b/800/1200'], false, 0, 45000, 450, NOW()),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 3, 'The System Awakens', 'Chapter 3 content...', ARRAY['https://picsum.photos/seed/ch3/800/1200', 'https://picsum.photos/seed/ch3b/800/1200'], false, 0, 42000, 420, NOW());

-- Insert demo comments
INSERT INTO comments (id, series_id, chapter_id, user_id, content, created_at) VALUES
  ('cccccccc-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'This is amazing! Best manhwa ever!', NOW()),
  ('cccccccc-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'The art is incredible!', NOW());

-- Insert demo likes
INSERT INTO likes (id, series_id, chapter_id, user_id, type, created_at) VALUES
  ('dddddddd-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', NULL, '22222222-2222-2222-2222-222222222222', 'series', NOW()),
  ('dddddddd-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'chapter', NOW());

-- Insert demo follows
INSERT INTO follows (id, series_id, user_id, created_at) VALUES
  ('eeeeeeee-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', NOW()),
  ('eeeeeeee-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', NOW());

-- Insert demo notifications
INSERT INTO notifications (id, user_id, title, message, type, is_read, created_at) VALUES
  ('ffffffff-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'New Chapter', 'Solo Leveling Chapter 180 is now available!', 'chapter', false, NOW()),
  ('ffffffff-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'New Follower', 'StoryMaster started following you', 'follow', true, NOW());

SELECT 'Seed data inserted successfully!' as status;
