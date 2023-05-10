import {create} from 'zustand'


interface BookState {
    currentPage: number;
    totalPages:number;
    zoom: number;
    nextPage: () => void;
    prevPage: () => void;
    setZoom: (value: number) => void;
    setPage: (value:number)=> void;
    setTotalPages:(value:number) => void;
  }
  

const useBookStore = create<BookState>((set)=>({
    currentPage: 1,
    totalPages:1,
    zoom:1,



    nextPage:()=> set((state)=>{
      if(state.currentPage === state.totalPages)return state;
      return {currentPage:state.currentPage + 1}  
    }),



    prevPage:()=> set((state)=>{
      if(state.currentPage === 1) return state;
      return{currentPage:state.currentPage-1}
    }),



    setTotalPages:(value:number)=> set((state)=>({totalPages:value})),


    setPage:(value:number)=> set((state)=>{
      if(value < 0 || value > state.totalPages) return state; 
      return{currentPage:value}
    }),

    
    setZoom:(value:number) => set(()=>({zoom:value}))
}))

export default useBookStore;