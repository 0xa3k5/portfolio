export type ThemeClasses = {
    bg: string;
    color: string;
    border: string;
    textHighlight: string;
    textHover: string;
  };
  
  export const darkTheme: ThemeClasses = {
    bg: "bg-midnight",
    color: "text-white",
    border: "border-white",
    textHighlight: 'text-daisy',
    textHover: 'hover:text-midnight'
  };
  
  export const lightTheme: ThemeClasses = {
    bg: "bg-foam",
    color: "text-midnight",
    border: "border-midnight",
    textHighlight: 'text-daisy',
    textHover: 'hover:text-foam'
  };
  
  export const dimTheme: ThemeClasses = {
    bg: "bg-shark",
    color: "text-white",
    border: "border-white",
    textHighlight: 'text-daisy',
    textHover: 'hover:text-shark'
  };
  