import * as Yup from "yup";


export const threadSchema = Yup.object().shape({
    thread: Yup.string().required("There is no content to create Thread"),
})
