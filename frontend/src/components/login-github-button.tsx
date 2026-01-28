"use client";

export default function LoginGitHubButton() {
  const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL; 

  const handleGitHubLogin = () => {
    window.location.href = `${backendUrl}/api/connect/github`;
  };

  return (
    <button
      onClick={handleGitHubLogin}
      className="btn bg-black text-white px-3.5 py-1 rounded-full w-fit mx-auto cursor-pointer"
    >
      Login with GitHub
    </button>
  );
}
