import { config } from "@keystatic/core/config";
import { storageLocal } from "@keystatic/core/component/local";
import { fields } from "@keystatic/core/fields";

export default config({
  storage: storageLocal(),
  collections: {
    students: {
      label: "Участники (Students)",
      slugField: "email",
      path: "data/students/*",
      schema: {
        email: fields.slug({ name: { label: "Email", validation: { isRequired: true } } }),
        fullName: fields.text({ label: "Полное имя", validation: { isRequired: true } }),
        role: fields.select({
          label: "Роль",
          options: [
            { label: "Ученик", value: "student" },
            { label: "Админ", value: "admin" },
            { label: "Преподаватель", value: "teacher" },
          ],
          defaultValue: "student",
        }),
        avatarUrl: fields.text({ label: "URL аватара" }),
        subscriptionStatus: fields.select({
          label: "Статус",
          options: [
            { label: "Активен", value: "active" },
            { label: "Заблокирован", value: "blocked" },
            { label: "Ожидает", value: "pending" },
          ],
          defaultValue: "active",
        }),
      },
    },

    courses: {
      label: "Предметы (Courses)",
      slugField: "title",
      path: "data/courses/*",
      schema: {
        title: fields.slug({ name: { label: "Название", validation: { isRequired: true } } }),
        description: fields.text({ label: "Описание", multiline: true }),
        subjectType: fields.select({
          label: "Тип предмета",
          options: [
            { label: "РПМ (Основы RolePlay)", value: "rpm" },
            { label: "Обществознание", value: "social" },
            { label: "История штата", value: "history" },
            { label: "Право", value: "law" },
          ],
          defaultValue: "rpm",
        }),
        orderIndex: fields.integer({ label: "Порядок" }),
      },
    },

    lessons: {
      label: "Уроки (Lessons)",
      slugField: "title",
      path: "data/lessons/*",
      schema: {
        title: fields.slug({ name: { label: "Название", validation: { isRequired: true } } }),
        contentMarkdown: fields.text({ label: "Содержание (Markdown)", multiline: true }),
        course: fields.relationship({
          label: "Предмет",
          collection: "courses",
        }),
      },
    },

    questions: {
      label: "Вопросы (Questions)",
      slugField: "text",
      path: "data/questions/*",
      schema: {
        text: fields.slug({ name: { label: "Текст вопроса", validation: { isRequired: true } } }),
        options: fields.array({
          label: "Варианты ответа",
          itemLabel: { fields: { answer: "Ответ" } },
          schema: {
            answer: fields.text({ label: "Ответ", validation: { isRequired: true } } ),
          },
        }),
        correctAnswer: fields.text({ label: "Правильный ответ (точное совпадение)", validation: { isRequired: true } }),
        explanation: fields.text({ label: "Пояснение", multiline: true }),
        imageUrl: fields.text({ label: "URL изображения" }),
        difficulty: fields.select({
          label: "Сложность",
          options: [
            { label: "Легкий", value: "easy" },
            { label: "Средний", value: "medium" },
            { label: "Сложный", value: "hard" },
          ],
          defaultValue: "medium",
        }),
        lesson: fields.relationship({
          label: "Урок",
          collection: "lessons",
        }),
      },
    },

    attempts: {
      label: "Попытки сдачи (Attempts)",
      slugField: "id",
      path: "data/attempts/*",
      schema: {
        id: fields.slug({ name: { label: "ID попытки" } }),
        student: fields.relationship({
          label: "Ученик",
          collection: "students",
        }),
        lesson: fields.relationship({
          label: "Урок / Экзамен",
          collection: "lessons",
        }),
        score: fields.float({ label: "Балл (0-25)", validation: { isRequired: true } }),
        answers: fields.text({ label: "Ответы (JSON)", multiline: true }),
        adminScore: fields.float({ label: "Балл админа (0-25)" }),
        status: fields.select({
          label: "Статус",
          options: [
            { label: "Ожидает проверки", value: "pending" },
            { label: "Проверено", value: "checked" },
            { label: "Аннулировано", value: "annulled" },
          ],
          defaultValue: "pending",
        }),
        createdAt: fields.datetime({ label: "Дата сдачи" }),
      },
    },
  },
});
