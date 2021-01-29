<?php

class gortisPhpExtension extends ViewPhpExtension
{
    /**
     * Инициализирует общие переменные для шаблонов.
     *
     * @param array $variables глобальные переменные запроса
     * @throws Exception
     */
    public function initializeCommonVariables(array $variables)
    {
        $templateEngine = $this->getTemplateEngine();
        $templateEngine->setCommonVar('search-action', $variables['pre-lang'] . '/search/search_do/');
        $templateEngine->setCommonVar('base', $this->getResourceDirectory());
        $templateEngine->setCommonVar('pre_lang', $variables['pre-lang']);
    }

    /**
     * Возвращает опрос, привязанный к странице (результат работы макроса vote::poll())
     * @param int $pageId идентификатор страницы
     * @return array
     * @throws Exception
     */
    public function getVote($pageId) {
        $data = $this->macros('vote', 'poll', [$pageId]);
        $data = is_array($data) ? $data : [];
        return $data;
    }

    /**
     * Возвращает объект настроек сайта
     *
     * @return iUmiObject|bool
     * @throws publicException
     */
    public function getSettingsContainer()
    {
        static $settingsObj;

        if ($settingsObj) {
            return $settingsObj;
        }

        /** @var umiSettings|UmiSettingsMacros $settings */
        $settings = cmsController::getInstance()->getModule('umiSettings');

        $settingsContainerId = $settings->getIdByCustomId('main');

        return $settingsObj = umiObjectsCollection::getInstance()->getObject($settingsContainerId);
    }

    /**
     * Возвращает главное меню
     *
     * @return array
     * @throws Exception
     */
    public function getMainMenu(): array
    {
        static $menu;

        if ($menu) {
            return $menu;
        }

        return $menu = $this->macros('menu', 'draw', ['main']);
    }

    /**
     * Сортирует многомерные массивы по значению
     *
     * @param array  $array      - массив для сортировки
     * @param string $keyForSort - ключ массива для сортировки
     * @param int    $typeSort   - тип сортировки
     * @return array - отсортированный массив
     */
    public function arraySort(array $array, string $keyForSort, int $typeSort = SORT_ASC): array
    {
        $value = array_column($array, $keyForSort);
        array_multisort($value, $typeSort, $array);
        return $array;
    }

    /**
     * Склоняет услово "услуга"
     *
     * @param int $count
     * @return string
     */
    public function getDeclination(int $count): string
    {
        if (
            $count % 10 === 0 ||
            $count % 10 >= 5 && $count % 10 <= 9 ||
            $count % 100 >= 11 && $count % 100 <= 19
        ) {
            return "услуг";
        }

        if ($count % 10 === 1) {
            return "услуга";
        }

        return "услуги";
    }

    /**
     * Форматирует дату к виду 01.01.2020
     *
     * @param int $time
     * @return string
     */
    public function dateFormatter(int $time): string
    {
        return date('d.m.Y', $time);
    }

    /**
     * Ссылка на главную
     *
     * @return string
     */
    public function getHomePageUrl(): string
    {
        return $this->getTemplateEngine()->getCommonVar('pre_lang') . '/';
    }

    /** ***************************** */
    /**
     * Определяет, нужно ли выводить форму опроса
     * @param array $variables результат работы макроса vote:poll()
     * @return bool
     */
    public function canShowVoteForm(array $variables) {
        return isset($variables['items'][0]['id']);
    }

    /**
     * Определяет, нужно ли вывести результаты опроса
     * @param array $variables результат работы макроса vote:poll()
     * @return bool
     */
    public function canShowVoteResults(array $variables) {
        return isset($variables['items'][0]['score']);
    }
}
