import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useMenuStore = create(
    persist(
        (set, get) => ({
            
            items: [],

            add: (item) => {

                let items = get().items.slice(0)

                items.push(item)

                set({ items })
            },
            delete: (id) => {

                let items = get().items.slice(0)

                items = items.filter((item) => item.id !== id)

                set({ items })
            },
            clear: () => set({ items: [] })
            
        }),
        {
            name: "grocery-list-menu-storage",
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
)

export default useMenuStore