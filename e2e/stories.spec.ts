import { test, expect } from "@playwright/test";

test.describe("Stories Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display story avatars in the horizontal scroll", async ({
    page,
  }) => {
    // Check if story avatars are visible
    const storyAvatars = await page.locator('div[class*="rounded-full"]').all();
    expect(storyAvatars.length).toBeGreaterThan(0);

    // Verify that usernames are displayed
    const usernames = await page.locator('span[class*="text-xs"]').all();
    expect(usernames.length).toBeGreaterThan(0);
  });

  test("should open story viewer when clicking on a story", async ({
    page,
  }) => {
    // Click on the first story
    await page.locator('div[class*="rounded-full"]').first().click();

    // Verify that the story viewer is opened
    const storyViewer = await page.locator(
      'div[class*="fixed inset-0 bg-black"]'
    );
    await expect(storyViewer).toBeVisible();

    // Verify that the username is displayed in the viewer
    const username = await page.locator(
      'span[class*="text-white font-medium"]'
    );
    await expect(username).toBeVisible();
  });

  test("should close story viewer when clicking close button", async ({
    page,
  }) => {
    // Open story viewer
    await page.locator('div[class*="rounded-full"]').first().click();

    // Click close button
    await page.locator('button:has-text("×")').click();

    // Verify that the story viewer is closed
    const storyViewer = await page.locator(
      'div[class*="fixed inset-0 bg-black"]'
    );
    await expect(storyViewer).not.toBeVisible();
  });

  test("should navigate between stories using click areas", async ({
    page,
  }) => {
    // Open first story
    await page.locator('div[class*="rounded-full"]').first().click();

    // Get initial username
    const initialUsername = await page
      .locator('span[class*="text-white font-medium"]')
      .textContent();

    // Click on the right side to go to next story
    await page
      .locator('div[class*="absolute inset-y-0 right-0 w-1/2"]')
      .click();

    // Wait for the next story to load
    await page.waitForTimeout(1000);

    // Get new username
    const newUsername = await page
      .locator('span[class*="text-white font-medium"]')
      .textContent();

    // Verify that the username has changed
    expect(newUsername).not.toBe(initialUsername);
  });

  test("should handle video stories correctly", async ({ page }) => {
    // Find and click on a video story (second story is a video)
    await page.locator('div[class*="rounded-full"]').nth(1).click();

    // Verify that video controls are visible
    const muteButton = await page.locator("button svg").first();
    await expect(muteButton).toBeVisible();

    // Verify that video is playing
    const video = await page.locator("video");
    await expect(video).toBeVisible();
    const isPlaying = await video.evaluate(
      (video: HTMLVideoElement) => !video.paused
    );
    expect(isPlaying).toBeTruthy();
  });

  test("should toggle mute state for video stories", async ({ page }) => {
    // Open a video story
    await page.locator('div[class*="rounded-full"]').nth(1).click();

    // Get initial mute state
    const video = await page.locator("video");
    const initialMuted = await video.evaluate(
      (video: HTMLVideoElement) => video.muted
    );

    // Click mute button
    await page.locator("button svg").first().click();

    // Verify mute state has changed
    const newMuted = await video.evaluate(
      (video: HTMLVideoElement) => video.muted
    );
    expect(newMuted).not.toBe(initialMuted);
  });

  test("should show loading state when switching stories", async ({ page }) => {
    // Open first story
    await page.locator('div[class*="rounded-full"]').first().click();

    // Click to next story
    await page
      .locator('div[class*="absolute inset-y-0 right-0 w-1/2"]')
      .click();

    // Verify loading state is visible
    const loader = await page.locator('div[class*="Loader"]');
    await expect(loader).toBeVisible();

    // Wait for story to load
    await page.waitForTimeout(1000);

    // Verify loading state is gone
    await expect(loader).not.toBeVisible();
  });
});
