import Image from "next/image";
import styles from "./page.module.css";
import { SignOut } from "./_components/auth-components";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <SignOut />

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="http://localhost:3001/client"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Client Component
          </a>
          <a
            href="http://localhost:3001/server"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Server Component
          </a>
        </div>
      </main>
    </div>
  );
}
