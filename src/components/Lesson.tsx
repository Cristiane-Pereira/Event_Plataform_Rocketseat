import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import React from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

interface LassonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

const Lasson = (props: LassonProps) => {
  const { slug } = useParams<{ slug: string }>();
  const isLasson = isPast(props.availableAt);
  const availabledDateFormatted = format(
    props.availableAt,
    "EEEE ' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR,
    }
  );

  const isActiveLesson = slug === props.slug;

  return (
    <div>
      <Link to={`/event/lesson/${props.slug}`} className="group">
        <span className="text-gray-300">
          {availabledDateFormatted}
          {/* Terça &bull; 22 &bull; Jun &bull; 2022 */}
        </span>
      </Link>

      <div
        className={classNames(
          `rounded border border-gray-500 p-4 mt-2 hover:border-green-500`,
          {
            "bg-green-500": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLasson ? (
            <React.Fragment>
              <CheckCircle size={20} />
              <span
                className={classNames(
                  `text-sm font-medium flex items-center gap-2`,
                  {
                    "text-white": isActiveLesson,
                    "text-blue-500": !isActiveLesson,
                  }
                )}
              >
                Conteúdo liberado
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Lock size={20} />
              <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                Em breve
              </span>
            </React.Fragment>
          )}

          <span
            className={classNames(
              `text-xs rounded py-[0.125rem] px-2 text-white border font-bold`,
              {
                "border-white": isActiveLesson,
                "border-green-300": !isActiveLesson,
              }
            )}
          >
            {props.type == "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong
          className={classNames(`mt-5 block`, {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {props.title}
        </strong>
      </div>
    </div>
  );
};

export default Lasson;
