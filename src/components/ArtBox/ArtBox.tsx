import cx from "classnames";
import { format } from "date-fns";

import styles from "./ArtBox.module.css";

type ArtBoxProps = {
  className?: string;
  children?: React.ReactNode;
  title: string;
  description: string;
  caption?: string;
  date: Date;
  link?: string;
  cardLink?: string;
};

function ArtBox(props: ArtBoxProps) {
  const {
    className,
    children,
    caption,
    date,
    title,
    description,
    link,
    cardLink,
  } = props;

  return (
    <div className={cx(styles.container, className)}>
      <a href={link} target="_blank">
        {children}
      </a>

      <a href={cardLink} target="_blank" className={styles.card}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>

        {caption && (
          <div className={cx(styles.caption)}>
            {caption.split("#")[0].trim()}
          </div>
        )}
        <div className={cx(styles.date)}>{format(date, "yyyy-MM-dd")}</div>
      </a>
    </div>
  );
}

export default ArtBox;
