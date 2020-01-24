<script async src='https://www.googletagmanager.com/gtag/js?id={$gaAccountId}'></script>
<script type="text/javascript">
    {literal}
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());
    {/literal}
    {if isset($backOffice) && $backOffice}
    gtag('config', '{$gaAccountId|escape:'htmlall':'UTF-8'}', { 'send_page_view': false } );
    {else}
    gtag('config', '{$gaAccountId|escape:'htmlall':'UTF-8'}');
    {if isset($userId)}
    gtag('config', '{$gaAccountId|escape:'htmlall':'UTF-8'}', { 'user_id': '{$userId|escape:'htmlall':'UTF-8'}' } );
    {/if}
    {/if}
</script>

