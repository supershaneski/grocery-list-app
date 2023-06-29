import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useResultStore = create(
    persist(
        (set, get) => ({
            
            items: [],

            set: (items) => {

                set({ items })

            },
            add: (item) => {

                let items = get().items.slice(0)

                items.push(item)

                set({ items })

            },
            delete: (name) => {

                let items = get().items.slice(0)

                items = items.filter((item) => item.name.toLowerCase() !== name.toLowerCase())

                set({ items })

            },
            clear: () => set({ items: [] })
            
        }),
        {
            name: "grocery-list-result-storage",
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
)

export default useResultStore