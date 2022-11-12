import { faker } from '@faker-js/faker';

export function generateFakeArticle() {
    return {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentence(10),
        body: faker.lorem.words(15),
        tags: faker.lorem.words(3)
    };
}

const article = generateFakeArticle();
console.log('title =', article.title);
console.log('descrip =', article.description);
console.log('body =', article.body);
console.log('tags =', article.tags);

function generateFakeUser() {
    return {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        about: faker.lorem.text(),
        job: faker.name.jobType(),
        company: faker.company.name(),
        address: {
            avatar: faker.image.avatar(),
            country: faker.address.country(),
            city: faker.address.city(),
            street: faker.address.street(),
            zipCode: faker.address.zipCode()
        }
    };
}

for (let i = 0; i <= 2; i++) {
    console.log(generateFakeUser());
}