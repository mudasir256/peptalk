import { FormikConfig, useFormik } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

type TextFormikConfigProps = {
  initialValue: string;
  maxLength: number;
  maxLengthError: string;
  onPressOk: (a: string) => void;
};

const useTextFormikConfig = ({
  initialValue,
  maxLength,
  maxLengthError,
  onPressOk,
}: TextFormikConfigProps): FormikConfig<{
  textValue: string;
}> => {
  const { t } = useTranslation();

  const formikConfig: FormikConfig<{
    textValue: string;
  }> = {
    //useMemo(() => {
    initialValues: {
      textValue: initialValue,
    },
    validationSchema: Yup.object({
      textValue: Yup.string()
        .trim()
        .required(t("yup.required"))
        .min(1, t("yup.required"))
        .max(maxLength, maxLengthError),
    }),
    onSubmit: async (values) => {
      onPressOk?.(values.textValue.trim());
    },
  };
  //}, []);

  return formikConfig;
};

type TextFormikType = ReturnType<typeof useFormik<{ textValue: string }>>;

export { useTextFormikConfig };
export type { TextFormikType, TextFormikConfigProps };
