import SearchIcon from "@mui/icons-material/Search";
import styles from "./inputField.module.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export default function InputField({ placeholder }: InputFieldProps) {
  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" placeholder={placeholder} />
      <SearchIcon />
    </div>
  );
}
