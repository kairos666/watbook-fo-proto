import { ProductIllustration } from "@/types/generics";
import { fakerFR as faker } from '@faker-js/faker';

export function ProductIllustrationBuilder(thematic:string, meta?:string[]):ProductIllustration {
    return {
        src: faker.image.urlLoremFlickr({ category: thematic, width: 600, height: 400 }),
        meta: (meta !== undefined) 
            ? meta 
            : faker.helpers.multiple(faker.word.noun, { count: faker.number.int({ min:0, max:2 }) })
    }
}