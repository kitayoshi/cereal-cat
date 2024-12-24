import Image from "next/image";

import ArtBox from "@/components/ArtBox";
import FrameBox from "@/components/FrameBox";

import styles from "./page.module.css";

type InfoItem = {
  title: string;
  content: string;
  contentLink?: string;
};

type IgData = {
  data: { id: string }[];
};

type PhotoData = {
  id: number;
  media_url: string;
  permalink: string;
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const igId = process.env.IG_ID;
  const igAccessToken = process.env.IG_ACCESS_TOKEN;
  const mediaRes = await fetch(
    `https://graph.instagram.com/v21.0/${igId}/media?access_token=${igAccessToken}`
  );
  const mediaResJson: IgData = await mediaRes.json();
  const index = Math.floor(Math.random() * mediaResJson.data.length);
  const data = mediaResJson.data[index];
  const igMediaId = data.id;
  const photoRes = await fetch(
    `https://graph.instagram.com/v21.0/${igMediaId}?fields=permalink,media_url,caption&access_token=${igAccessToken}`
  );
  const photoResJson: PhotoData = await photoRes.json();
  const { permalink, media_url: mediaUrl } = photoResJson;

  const currentYear = new Date().getFullYear();
  const infoList: InfoItem[] = [
    {
      title: "Owner, primary",
      content: "Haru343",
      contentLink: "https://x.com/haru3433",
    },
    {
      title: "Owner, secondary",
      content: "Kitayoshi",
      contentLink: "https://kitayo.si/",
    },
    {
      title: "Instagram",
      content: "https://www.instagram.com/cereal.cat",
      contentLink: "https://www.instagram.com/cereal.cat",
    },
  ];

  const description =
    "A decent white cat.\nBorn 2021.4🐱🐈‍⬛\nLoves to hunt and play";

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.slide}>
          <ArtBox
            title="Cereal / 麦片"
            description={description}
            cardLink={"https://www.instagram.com/cereal.cat"}
            link={permalink}
          >
            <FrameBox>
              <Image
                className={styles.image}
                src={mediaUrl}
                alt="Cereal's picture"
                width={1440}
                height={1440}
                priority
              />
            </FrameBox>
          </ArtBox>
        </div>
        <div className={styles.slide}>
          <div className={styles.infoList}>
            {infoList.map((infoItem, index) => (
              <div key={index} className={styles.infoItem}>
                <div className={styles.infoTitle}>{infoItem.title}</div>
                <div className={styles.infoContent}>
                  {infoItem.contentLink ? (
                    <a
                      className={styles.infoLink}
                      href={infoItem.contentLink}
                      target="_blank"
                    >
                      {infoItem.content}
                    </a>
                  ) : (
                    infoItem.content
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        Portions of this content are ©{currentYear} by Kitayoshi SON
      </footer>
    </div>
  );
}
