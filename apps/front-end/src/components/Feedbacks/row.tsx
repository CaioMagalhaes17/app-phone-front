import { HSeparator, Text } from "@app/ui";
import { Star } from "lucide-react";
import { FeedbackType } from "../../types/feedback";
import dayjs from "dayjs";
import { userImg } from "../../constants/images";

export function FeedbackRow({ feedback }: { feedback: FeedbackType }) {
  const totalStars = 5;
  console.log(feedback.clientProfile.name)
  return (
    <>
      <div className="max-h-[140px] mt-5 flex flex-row items-start gap-5">
        <div className="w-[100px]">
          <img width="100" height="100" src={userImg} className="rounded-3xl" />
        </div>
        <div className="flex flex-col max-w-[80%]">
          <Text className="flex flex-row gap-5 items-center text-center text-dark dark:text-white text-lg" as="span">
            {feedback.clientProfile.name}
            <Text className="text-white-dark text-sm mt-1" as="span">
              {dayjs(feedback.createdAt).format('DD/MM/YYYY')}
            </Text>
          </Text>
          <div className="flex flex-row mb-2">
            {[...Array(totalStars)].map((_, index) => (
              <Star
                key={index}
                className={index < feedback.rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                size={16}
              />
            ))}
          </div>
          <div className="text-left">
            <Text className="text-white-dark" as="span">{feedback.description}</Text>
          </div>
        </div>
      </div>
      <HSeparator />
    </>
  )
}