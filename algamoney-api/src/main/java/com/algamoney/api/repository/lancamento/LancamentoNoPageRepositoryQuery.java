package com.algamoney.api.repository.lancamento;

import java.util.List;

import com.algamoney.api.model.Lancamento;
import com.algamoney.api.repository.filter.LancamentoFilter;
import com.algamoney.api.repository.projection.ResumoLancamento;

public interface LancamentoNoPageRepositoryQuery {
	
	public List<Lancamento> filtrar(LancamentoFilter lancamentoFilter);
	
	public List<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter);

}