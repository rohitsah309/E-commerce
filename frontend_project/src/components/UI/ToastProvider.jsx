import { Toaster } from "react-hot-toast";


function ToastProvider(){
    return(
        <Toaster
            position="top-center"
            toastOptions={{
                style: {
                background: "#111",
                color: "#fff",
                borderRadius: "10px",
                padding: "12px 16px",
                fontSize: "14px",
            },
            success: {
                iconTheme: {
                    primary: "#00c853",
                    secondary: "#fff",
                },
            },
            error: {
                iconTheme: {
                    primary: "#ff1744",
                    secondary: "#fff",
                },
            },
        }}
        />
    )
}


export default ToastProvider;