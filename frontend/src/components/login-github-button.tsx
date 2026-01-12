"use client";

export default function LoginGitHubButton() {
  const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL; 

  const handleGitHubLogin = () => {
    window.location.href = `${backendUrl}/api/connect/github`;
  };

  return (
    <button
      onClick={handleGitHubLogin}
      className="btn bg-black text-white"
    >
      Login with GitHub
    </button>
  );
}
