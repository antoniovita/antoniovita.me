CREATE TABLE "ArticleView" (
    "slug" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ArticleView_pkey" PRIMARY KEY ("slug", "sessionId")
);
CREATE TABLE "ArticleLike" (
    "slug" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ArticleLike_pkey" PRIMARY KEY ("slug", "visitorId")
);
CREATE TABLE "EngagementRateLimit" (
    "key" TEXT NOT NULL,
    "requests" INTEGER NOT NULL DEFAULT 1,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "EngagementRateLimit_pkey" PRIMARY KEY ("key")
);
CREATE INDEX "EngagementRateLimit_expiresAt_idx" ON "EngagementRateLimit"("expiresAt");

-- Access goes through the Node API and Prisma, never Supabase's public Data API.
ALTER TABLE "ArticleView" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ArticleLike" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EngagementRateLimit" ENABLE ROW LEVEL SECURITY;
