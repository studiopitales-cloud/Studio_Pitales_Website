const PLACE_ID = 'ChIJG19CHQCdAhURSgoUtzvciws'

export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) return res.status(200).json({ rating: null, count: null })

  try {
    const r = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount&key=${apiKey}`
    )
    const data = await r.json()
    if (data.error) return res.status(200).json({ rating: null, count: null })
    res.status(200).json({
      rating: data.rating          ?? null,
      count:  data.userRatingCount ?? null,
    })
  } catch {
    res.status(200).json({ rating: null, count: null })
  }
}
