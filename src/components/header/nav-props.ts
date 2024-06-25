export const navigation: Array<{
    name: string;
    href: string;
    current: boolean;
    onClick: () => void;
  }> = [
    { name: "Home", href: "/", current: true, onClick: () => {} },
    { name: "Console", href: "/console", current: false, onClick: () => {} },
    { name: "Connect", href: "/connect", current: false, onClick: () => {} },
    {
      href: "/knowledge-base",
      name: "Knowledge Base",
      onClick: () => {},
      current: false,
    },
  ];