import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";

import styles from "./MainForm.module.scss";

const clearForm = {
  name: "",
  password: "",
};

const MainForm = () => {
  const [data, setData] = useState(clearForm);
  const [isSend, setIsSend] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSendForm = (data) => {
    setData(data);
    setIsSend((value) => !value);

    console.log(data);
  };

  /**
   * Будет следить за изменениями в выбранном инпуте.
   * Например, можно сделать динамическую проверку валидности пароля,
   * или progress bar заполнения формы, или сложности пароля.
   */
  console.log(watch("name"));

  /**
   * Будет вывод в консоль "test" при первом рендере (монтировании) компонента
   * и при каждом изменении data.
   */
  useMemo(() => {
    console.log("test");
  }, [data]);

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSendForm)}>
        <div>
          <label>
            Enter your name: <br />
            <input
              type="text"
              placeholder="Your name..."
              defaultValue=""
              {...register("name", { required: true })}
            />
          </label>
          <br />
          <label>
            Enter your password:
            <br />
            <input
              type="password"
              placeholder="Your password"
              {...register("password", { required: true })}
            />
          </label>
          <br />
          {Object.keys(errors).length ? <span>Fill all inputs</span> : ""}
          <br />
          <button type="submit">Send form</button>
        </div>
      </form>
      {isSend ? Object.entries(data).map((e) => `${e[1]} | `) : ""}
    </div>
  );
};

export default MainForm;
