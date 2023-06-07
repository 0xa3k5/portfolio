export type ThemeClasses = {
    bg: string;
    bgHover: string;
    color: string;
    border: string;
    textHighlight: string;
    textHover: string;
  };
  
  export const darkTheme: ThemeClasses = {
    bg: "bg-midnight",
    bgHover: 'hover:bg-foam',
    color: "text-foam",
    border: "border-foam",
    textHighlight: 'text-daisy',
    textHover: 'hover:text-midnight'
  };
  
  export const lightTheme: ThemeClasses = {
    bg: "bg-foam",
    bgHover: 'hover:bg-midnight',
    color: "text-midnight",
    border: "border-midnight",
    textHighlight: 'text-daisy',
    textHover: 'hover:text-foam'
  };
  
  export const dimTheme: ThemeClasses = {
    bg: "bg-shark",
    bgHover: 'hover:bg-white',
    color: "text-white",
    border: "border-white",
    textHighlight: 'text-daisy',
    textHover: 'hover:text-shark'
  };
  