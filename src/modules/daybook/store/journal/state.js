
export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint exercitationem placeat natus assumenda itaque repellendus, dolorum tempora! In quidem doloribus quibusdam reprehenderit est, voluptates ut dolores! Explicabo nam harum maxime?',
            picture: null,
        },
        {
            id: new Date().getTime() + 1000,
            date: new Date().toDateString(),
            text: 'dolorum tempora! In quidem doloribus quibusdam reprehenderit est, voluptates ut dolores! Explicabo nam harum maxime?',
            picture: null,
        },
        {
            id: new Date().getTime() + 2000,
            date: new Date().toDateString(),
            text: 'dolorum tempora! In quidem doloribus quibusdam reprehenderit est, voluptates ut dolores! Explicabo nam harum maxime?',
            picture: null,
        },
]
})