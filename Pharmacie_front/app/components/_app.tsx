// pages/_app.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AppProps } from "next/app";

// Define the types
type SessionContextProps = {
  session: any; // Adjust the type according to your session structure
};

type SessionProviderProps = {
  children: ReactNode;
  initialSession: any; // Adjust the type according to your session structure
};

// Create a context to manage the session data
const SessionContext = createContext<SessionContextProps | undefined>(undefined);

// A custom hook to access the session data
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}

export function SessionProvider({ children, initialSession }: SessionProviderProps) {
  const [session, setSession] = useState(initialSession);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/session"); // Change the API endpoint accordingly
        const data = await response.json();
        setSession(data.session);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []); // Run only once on mount

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const initialSession = pageProps.session; // Assuming you have the initial session data

  return (
    <SessionProvider initialSession={initialSession}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
