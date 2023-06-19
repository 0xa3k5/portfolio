export type ThemeClasses = {
    bg: string;
    bgHover: string;
    color: string;
    border: string;
    textHighlight: string;
    textHover: string;
    outline: string;
    beforeBg: string;
  };
  
  export const darkTheme: ThemeClasses = {
    bg: "bg-midnight",
    beforeBg: "before:bg-midnight",
    bgHover: 'hover:bg-foam',
    color: "text-foam",
    border: "border-foam",
    outline: "outline-foam",
    textHighlight: 'text-daisy',
    textHover: 'hover:text-midnight'
  };
  
  export const lightTheme: ThemeClasses = {
    bg: "bg-foam",
    beforeBg: "before:bg-foam",
    bgHover: 'hover:bg-midnight',
    color: "text-midnight",
    border: "border-midnight",
    outline: "outline-midnight",
    textHighlight: 'text-daisy',
    textHover: 'hover:text-foam'
  };
  
  export const dimTheme: ThemeClasses = {
    bg: "bg-shark",
    beforeBg: "before:bg-shark",
    bgHover: 'hover:bg-white',
    color: "text-white",
    border: "border-white",
    outline: "outline-white",
    textHighlight: 'text-daisy',
    textHover: 'hover:text-shark'
  };
  