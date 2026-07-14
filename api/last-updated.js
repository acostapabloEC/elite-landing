// Returns the latest production-deploy timestamp for each dashboard project,
// so the landing page can show real "last updated" dates without any manual bookkeeping.
const PROJECTS = {
  moneyball: 'prj_x2TKRhtPqYP8SpMF2gyHDjpMYRbj',
  'bda-payback': 'prj_QdYqAee5WqBWXSrd1akTXxGefZaj',
  'bda-projection': 'prj_H1XcUnHSz7Dx0qI0sQh8zsH3qXcw',
  'bda-net-profit-bridge': 'prj_MxlDxYJZckJgKeEJJBOTHvPoKHF2',
  'bda-calls-efficiency-dashboard': 'prj_Dm8WKqxxnBo1BlVHytjK16149QRk',
  'epg-marketing-dashboard': 'prj_YqDPaIUfI2NZ5mCPq9XoNNQTllaF',
  'epg-youtube-dashboard': 'prj_W8NsdIAC0c8DvGCiC1YjMtncpdEg',
  'epg-tv-dashboard': 'prj_b30PcioBXyJ7LecFsicmkC2ogiTn',
  'epg-instagram-dashboard': 'prj_KBAcXGQGRlqutg343X2xL8eErwP9',
  'epg-google-reviews-dashboard': 'prj_QihCDzxWf9TY6EamEfpBnnvQDY94',
  'epg-simplecast-podcast': 'prj_qqqMHooXpRIGZjhLG1xeaashZ7f7',
};

export default async function handler(req, res) {
  const token = process.env.VERCEL_API_TOKEN;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !teamId) {
    res.status(500).json({ error: 'Missing VERCEL_API_TOKEN or VERCEL_TEAM_ID env vars' });
    return;
  }

  const entries = await Promise.all(
    Object.entries(PROJECTS).map(async ([key, projectId]) => {
      try {
        const url = `https://api.vercel.com/v6/deployments?teamId=${teamId}&projectId=${projectId}&limit=1&target=production&state=READY`;
        const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        if (!r.ok) return [key, null];
        const data = await r.json();
        const dep = data.deployments && data.deployments[0];
        return [key, dep ? dep.ready || dep.createdAt : null];
      } catch {
        return [key, null];
      }
    })
  );

  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
  res.status(200).json(Object.fromEntries(entries));
}
