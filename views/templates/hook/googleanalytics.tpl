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
    gtag('config', '{$gaAccountId|escape:'htmlall':'UTF-8'}', {ldelim}'send_page_view': false{rdelim});
    {else}
    let options = {ldelim} {rdelim};
    {if isset($userId)}
    options['user_id'] = '{$userId|escape:'htmlall':'UTF-8'}';
    {/if}
    {if $gaAnonymizeEnabled}
    options['anonymize_ip'] = true;
    {/if}
    gtag('config', '{$gaAccountId|escape:'htmlall':'UTF-8'}', options);
    {/if}
</script>

